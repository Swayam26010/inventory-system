from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.customer import Customer
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):

    # 1. Check customer exists
    customer = db.query(Customer).filter(Customer.id == order.customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    total_amount = 0
    order_items_db = []

    # 2. Process each item
    for item in order.items:

        product = db.query(Product).filter(Product.id == item.product_id).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        # 3. Check stock
        if product.quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {product.name}"
            )

        # 4. Deduct stock
        product.quantity -= item.quantity

        # 5. Calculate price
        item_price = product.price * item.quantity
        total_amount += item_price

        # 6. Prepare order item
        order_items_db.append({
            "product_id": product.id,
            "quantity": item.quantity,
            "price": product.price
        })

    # 7. Create order
    new_order = Order(
        customer_id=order.customer_id,
        total_amount=total_amount
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # 8. Create order items
    for item in order_items_db:
        db_item = OrderItem(
            order_id=new_order.id,
            product_id=item["product_id"],
            quantity=item["quantity"],
            price=item["price"]
        )
        db.add(db_item)

    db.commit()

    # 9. Build response
    return {
        "id": new_order.id,
        "customer_id": new_order.customer_id,
        "total_amount": new_order.total_amount,
        "items": order_items_db
    }

@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()

    return {
        "id": order.id,
        "customer_id": order.customer_id,
        "total_amount": order.total_amount,
        "items": [
            {
                "product_id": i.product_id,
                "quantity": i.quantity,
                "price": i.price
            }
            for i in items
        ]
    }

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()

    # 1. restore stock first
    for item in items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            product.quantity += item.quantity

    # 2. delete order items FIRST (IMPORTANT FIX)
    db.query(OrderItem).filter(OrderItem.order_id == order.id).delete()

    # 3. now delete order
    db.delete(order)

    db.commit()

    return {"message": "Order deleted successfully"}