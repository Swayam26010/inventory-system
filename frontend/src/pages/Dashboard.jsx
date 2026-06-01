import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Products</h5>
              <h2>{stats.total_products}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Customers</h5>
              <h2>{stats.total_customers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Orders</h5>
              <h2>{stats.total_orders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Low Stock</h5>
              <h2>{stats.low_stock_products}</h2>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;