from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order, OrderItem

from app.routers.products import router as product_router
from app.routers.customers import router as customer_router
from app.routers.orders import router as order_router
from app.routers.dashboard import router as dashboard_router

app = FastAPI(title="Inventory API")

# =========================
# CORS CONFIGURATION
# =========================
origins = [
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://inventory-system-lrgtfa05n-swayam-s-projects7.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DATABASE INIT
# =========================
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# =========================
# ROUTES
# =========================
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)

# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def home():
    return {"message": "Inventory API Running"}