import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Inventory System
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          <Link className="nav-link" to="/products">
            Products
          </Link>

          <Link className="nav-link" to="/customers">
            Customers
          </Link>

          <Link className="nav-link" to="/orders">
            Orders
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;