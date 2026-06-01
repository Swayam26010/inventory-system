import { useState } from "react";
import { createCustomer } from "../api/customerApi";

function CustomerForm({ onCustomerAdded }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCustomer(formData);

      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });

      onCustomerAdded();

      alert("Customer added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add customer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">

      <div className="row">

        <div className="col-md-4">
          <input
            className="form-control"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Add Customer
          </button>
        </div>

      </div>

    </form>
  );
}

export default CustomerForm;