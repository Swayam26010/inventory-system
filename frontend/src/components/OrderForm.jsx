import { useState } from "react";
import { createOrder } from "../api/orderApi";

function OrderForm({ onOrderAdded }) {
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrder({
        customer_id: Number(customerId),
        items: [
          {
            product_id: Number(productId),
            quantity: Number(quantity)
          }
        ]
      });

      setCustomerId("");
      setProductId("");
      setQuantity("");

      onOrderAdded();

      alert("Order created successfully");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Failed to create order");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">

        <div className="col-md-3">
          <input
            className="form-control"
            type="number"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="number"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Create Order
          </button>
        </div>

      </div>
    </form>
  );
}

export default OrderForm;