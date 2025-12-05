
# 🌟 Personal Blog Platform

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.0-green.svg)
![Angular](https://img.shields.io/badge/Angular-17.2.0-red.svg)

A **full-stack personal blog platform** built with **Java (Spring Boot)** for the backend and **Angular** for the frontend. Perfect for writers, bloggers, and content creators who want to share their thoughts with the world while enjoying a modern, secure, and scalable solution.

---

## ✨ **Key Features**

✅ **User Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Writer/Reader)
- Secure login and registration

✅ **Content Management**
- Create, edit, and publish blog articles or skills lessons.
- Rich summarize and explaining generation
- Skills and keywords fr better explanations

✅ **Search & Discovery**
- Elasticsearch integration for fast, relevant search
- MongoDB for flexible data storage

✅ **Modern UI/UX**
- Responsive Angular frontend
- Clean, intuitive interface
- Role-specific dashboards

✅ **Scalability & Performance**
- Optimized for high traffic
- RESTful API design
- Efficient data handling

---

## 🛠️ **Tech Stack**

### **Backend (Java)**
- **Framework**: Spring Boot 4.0.0
- **Database**: MongoDB (NoSQL)
- **Search**: Elasticsearch
- **Security**: JWT, Spring Security
- **Validation**: Spring Validation
- **Build Tool**: Maven
- **Language**: Java 21

### **Frontend (Angular)**
- **Framework**: Angular 17.2.0
- **Build Tool**: Angular CLI
- **Styling**: SCSS
- **Testing**: Jasmine + Karma
- **State Management**: RxJS

### **Other Tools**
- **IDE**: IntelliJ IDEA / VS Code
- **Package Manager**: npm / yarn
- **CI/CD**: Maven Wrapper

---

## 📦 **Installation**

### **Prerequisites**
Ensure you have the following installed:
- **Java JDK 21** ([Download](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html))
- **Maven 3.9.11** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 20+** ([Download](https://nodejs.org/))
- **Angular CLI** (`npm install -g @angular/cli@17.2.2`)
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))
- **Elasticsearch** ([Download](https://www.elastic.co/downloads/elasticsearch))

---

### **Quick Start**

#### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/personal-blog.git
cd personal-blog
```

#### **2. Set Up the Backend**
```bash
# Navigate to the backend directory
cd blog-backend

# Build and run the Spring Boot application
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

#### **3. Set Up the Frontend**
```bash
# Navigate to the frontend directory
cd ../blog-frontend

# Install dependencies
npm install

# Start the Angular development server
npm start
```
The frontend will start on `http://localhost:4200`.

---

### **Alternative: Docker Setup**
If you prefer Docker, you can use the following `docker-compose.yml` (add this to your project root):

```yaml
version: '3.8'

services:
  backend:
    build: ./blog-backend
    ports:
      - "8080:8080"
    depends_on:
      - mongodb
      - elasticsearch
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/blogdb
      - SPRING_DATA_ELASTICSEARCH_URI=http://elasticsearch:9200

  frontend:
    build: ./blog-frontend
    ports:
      - "4200:4200"
    depends_on:
      - backend

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

volumes:
  mongodb_data:
  elasticsearch_data:
```

Run the services with:
```bash
docker-compose up --build
```

---

## 🎯 **Usage**

### **Frontend Routing**
| Route | Description |
|-------|-------------|
| `/login` | Login page |
| `/register` | Registration page |
| `/home` | Homepage (public) |
| `/writer` | Writer dashboard (protected) |
| `/reader` | Reader dashboard (protected) |

---

## 📁 **Project Structure**

```
personal-blog/
├── blog-backend/          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Java source code
│   │   │   └── resources/ # Configuration files
│   ├── pom.xml            # Maven dependencies
│   └── .gitignore
│
├── blog-frontend/         # Angular frontend
│   ├── src/
│   │   ├── app/           # Angular components
│   │   ├── assets/        # Static assets
│   │   ├── styles/        # Global styles
│   │   └── index.html     # Main HTML file
│   ├── angular.json       # Angular configuration
│   ├── package.json       # Node dependencies
│   └── .gitignore
│
├── .idea/                 # IDE settings
├── .editorconfig          # Editor configuration
├── README.md              # This file
└── LICENSE                # License file
```

---

## 🔧 **Configuration**

### **Environment Variables**
Create a `.env` file in the `blog-backend` directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/blogdb

# Elasticsearch Configuration
ELASTICSEARCH_URI=http://localhost:9200

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000 # 24 hours
```

### **Customization**
- **Backend**: Modify `application.properties` in `blog-backend/src/main/resources`.
- **Frontend**: Update `angular.json` for build configurations or `styles.scss` for global styles.

---

## 🤝 **Contributing**

We welcome contributions! Here’s how you can help:

### **Development Setup**
1. Fork the repository.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/personal-blog.git
   ```
3. Install dependencies (as shown in the [Installation](#%E2%9C%94-installation) section).
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```

### **Code Style Guidelines**
- **Backend**: Follow Spring Boot conventions. Use Lombok for boilerplate reduction.
- **Frontend**: Follow Angular style guide. Use SCSS for styling.
- **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/) format.

### **Pull Request Process**
1. Write a clear description of your changes.
2. Ensure your code passes all tests.
3. Submit a pull request to the `main` branch.

---

## 📝 **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---


## 🐛 **Issues & Support**

### **Reporting Issues**
Found a bug or have a feature request? Open an issue on GitHub with:
- A clear description of the problem.
- Steps to reproduce (if applicable).
- Screenshots or logs (if relevant).

### **Getting Help**
- Join our [Discussions](https://github.com/your-username/personal-blog/discussions).
- Ask questions on [Stack Overflow](https://stackoverflow.com/) with the `personal-blog` tag.

### **FAQ**
**Q: How do I deploy this?**
A: You can deploy the backend to any Java servlet container (e.g., Tomcat, WildFly) or use a cloud platform like Heroku or AWS. The frontend can be deployed to any static hosting service (e.g., Netlify, Vercel).

**Q: Can I use a different database?**
A: Yes! The backend is designed to work with MongoDB, but you can easily switch to another database by modifying the configuration in `application.properties`.

---


## 🚀 **Get Started Today!**

Ready to build your personal blog? Star this repository, clone it, and start customizing!

```bash
git clone https://github.com/your-username/personal-blog.git
cd personal-blog
npm install && ./mvnw spring-boot:run
```

Happy coding! 🎉
```
