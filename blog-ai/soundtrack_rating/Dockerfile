# ===============================
# 🐍 Base Image
# ===============================
FROM python:3.11-slim

# ===============================
# 📁 Set Working Directory
# ===============================
WORKDIR /app

# ===============================
# 📦 Install Dependencies
# ===============================
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# ===============================
# 📂 Copy Project Files
# ===============================
COPY . .

# ===============================
# 🚀 Run Combined Service
# ===============================
CMD ["python", "pipeline/enrichment_service.py"]