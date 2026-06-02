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


app = FastAPI()

# ✅ CORS FIRST (VERY IMPORTANT)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://inventory-system-lrgtfa05n-swayam-s-projects7.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# tables init
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


# routers
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "Inventory API Running"}