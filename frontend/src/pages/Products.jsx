import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct
} from "../api/productApi";

import ProductForm from "../components/ProductForm";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] =
    useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
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
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const clearEditing = () => {
    setEditingProduct(null);
  };

  return (
    <div className="container mt-4">

      <h2>Products</h2>

      <ProductForm
        onProductAdded={loadProducts}
        editingProduct={editingProduct}
        clearEditing={clearEditing}
      />

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr key={product.id}>

              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(product.id)
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

export default Products;