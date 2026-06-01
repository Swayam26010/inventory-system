from fastapi import FastAPI

from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# ✅ MUST import all models BEFORE create_all
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order, OrderItem

from app.routers.products import router as product_router
from app.routers.customers import router as customer_router
from app.routers.orders import router as order_router
from app.routers.dashboard import router as dashboard_router


app = FastAPI()

# create tables AFTER importing models
Base.metadata.create_all(bind=engine)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "Inventory API Running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)