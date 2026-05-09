# ===============================
# 🐍 Python Base Image
# ===============================
FROM python:3.11-slim

# ===============================
# 📁 Working Directory
# ===============================
WORKDIR /app


# ===============================
# 📦 Copy Requirements
# ===============================
COPY requirements.txt .

# ===============================
# 📦 Install Python Dependencies
# ===============================
RUN pip install --no-cache-dir --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

# ===============================
# 📂 Copy Project Files
# ===============================
COPY . .

# ===============================
# 🌐 Environment Variables
# ===============================
ENV PYTHONUNBUFFERED=1

# ===============================
# 🚀 Start AI Service
# ===============================
CMD ["python", "app.py"]