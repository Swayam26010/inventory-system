import { useEffect, useState } from "react";

import {
  getCustomers,
  deleteCustomer
} from "../api/customerApi";

import CustomerForm from "../components/CustomerForm";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Customers</h2>

      <CustomerForm
        onCustomerAdded={loadCustomers}
      />

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((customer) => (
            <tr key={customer.id}>

              <td>{customer.id}</td>
              <td>{customer.full_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(customer.id)
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

export default Customers;