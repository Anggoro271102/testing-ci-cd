from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Izinkan semua (aman untuk lokal)
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"service": "Backend API", "status": "Running"}

@app.get("/api/data")
def get_data():
    return {
        "id": "USR-001",
        "name": "Anggoro",
        "role": "Fullstack Developer",
        "message": "Data ini dikirim dari Python Backend!"
    }