from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers.products import router as product_router
from app.routers.customers import router as customer_router
from app.routers.orders import router as order_router
from app.routers.dashboard import router as dashboard_router

app = FastAPI(title="Inventory API")

# =========================
# CORS (PRODUCTION SAFE)
# =========================
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://inventory-system-e24t-bdd2kc79f-swayam-s-projects7.vercel.app",
    
    # 👉 later replace with your final Vercel domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DB INIT
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

@app.get("/")
def home():
    return {"message": "Inventory API Running"}