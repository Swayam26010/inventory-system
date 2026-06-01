import { useEffect, useState } from "react";

import {
  getOrders,
  getOrder,
  deleteOrder
} from "../api/orderApi";

import OrderForm from "../components/OrderForm";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await getOrder(id);

      alert(
        JSON.stringify(
          response.data,
          null,
          2
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to fetch order");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Orders</h2>

      <OrderForm onOrderAdded={loadOrders} />

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>

              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.total_amount}</td>

              <td>

                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() =>
                    handleViewDetails(order.id)
                  }
                >
                  Details
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(order.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Orders;