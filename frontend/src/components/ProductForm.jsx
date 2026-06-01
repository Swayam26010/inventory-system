import { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct
} from "../api/productApi";

function ProductForm({
  onProductAdded,
  editingProduct,
  clearEditing
}) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        sku: editingProduct.sku,
        price: editingProduct.price,
        quantity: editingProduct.quantity
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      price: "",
      quantity: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      };

      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          payload
        );

        alert("Product updated successfully");
        clearEditing();
      } else {
        await createProduct(payload);
        alert("Product added successfully");
      }

      resetForm();
      onProductAdded();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">

        <div className="col-md-3">
          <input
            className="form-control"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            name="quantity"
            placeholder="Stock"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            {editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>

      </div>
    </form>
  );
}

export default ProductForm;