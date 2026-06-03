# Inventory Management System

A full-stack Inventory Management System built using:

* FastAPI (Backend)
* React + Vite (Frontend)
* PostgreSQL (Database)
* SQLAlchemy ORM
* Docker Support

 Features

* Product Management (Create, Read, Update, Delete)
* Customer Management
* Order Management
* Inventory Stock Tracking
* Automatic Stock Deduction on Order Creation
* Stock Restoration on Order Deletion
* REST API Documentation with Swagger UI


 Project Structure

inventory-system/

├── backend/

├── frontend/

└── README.md


 Backend Setup

 1. Navigate to Backend
cd backend

2. Create Virtual Environment

python3 -m venv venv

3. Activate Virtual Environment

Linux/Mac:

source venv/bin/activate

Windows:

venv\Scripts\activate

4. Install Dependencies

pip install -r requirements.txt

 5. Create PostgreSQL Database

Create a PostgreSQL database named:
inventory

Example:

CREATE DATABASE inventory;

 6. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory

Replace:

* postgres → your PostgreSQL username
* password → your PostgreSQL password

 7. Start Backend

uvicorn app.main:app --reload

Backend runs at:

http://localhost:8000

Swagger Documentation:

http://localhost:8000/docs


 Frontend Setup

 1. Navigate to Frontend

cd frontend

 2. Install Dependencies

npm install

 3. Create Environment File

Create a `.env` file inside the `frontend` folder.

VITE_API_URL=http://localhost:8000

 4. Start Frontend

npm run dev

Frontend runs at:

http://localhost:5173


 API Endpoints

 Products

* GET /products
* POST /products
* PUT /products/{id}
* DELETE /products/{id}

 Customers

* GET /customers
* POST /customers
* PUT /customers/{id}
* DELETE /customers/{id}

 Orders

* GET /orders
* POST /orders
* DELETE /orders/{id}

---

 Notes

* Products that are referenced by existing order items cannot be deleted.
* Deleting an order restores product stock automatically.
* Environment files (`.env`) are intentionally excluded from GitHub using `.gitignore`.

---

 Author

Swayam Bhajan


