
# 🌟 Personal Blog Platform

[![My Skills](https://skillicons.dev/icons?i=angular,html,css,ts,githubactions,docker,spring,mongodb,py)](https://skillicons.dev)

A **full-stack personal blog platform** built with **Java (Spring Boot)** for the backend and **Angular** for the frontend. Perfect for articles readers and me, who will be the author of many ones and the creator of some lessons related to IT skills.

---

## ✨ **Key Features**

✅ **User Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Writer/Reader)
- Secure login and registration

✅ **Content Management**
- Create, edit, and publish blog articles or skills lessons.
- Rich summarize and explaining generation
- Skills and keywords for better explanations

✅ **Search & Discovery**
- Elasticsearch integration for fast and relevant search and AI recommandations
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
- **Language**: Java 21, Python
- **Testing**: JUnit, Mockito 

### **Frontend (Angular)**
- **Framework**: Angular 21
- **Build Tool**: Angular CLI
- **Styling**: SCSS, bootstrap
- **Testing**: Jasmine + Karma
- **State Management**: RxJS

### **Other Tools**
- **IDE**: IntelliJ IDEA / VS Code
- **Package Manager**: npm / yarn
- **DevOps**: GitHub Actions / Docker
- **Tasks**: Jira/Confluence


---

## 📦 **Installation**

### **Prerequisites**
Ensure you have the following installed:
- **Java JDK 21** ([Download](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html))
- **Maven 3.9.11** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 20+** ([Download](https://nodejs.org/))
- **Angular CLI** (`npm install -g @angular/cli@21`)
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))
- **Python**

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
The backend will start on `http://localhost:<your-configured-port`.

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


### **Customization**
- **Backend**: Modify `application.properties` in `blog-backend/src/main/resources`.
- **Frontend**: Update `angular.json` for build configurations or `styles.scss` for global styles.
- **Database**: Create new database using MongoDB Compass and insert new data there according to the entities code.

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


### **FAQ**
**Q: How do I deploy this?**
A: You can deploy the backend to any Java servlet container (e.g., Tomcat, WildFly) or use a cloud platform like Heroku or AWS. The frontend can be deployed to any static hosting service (e.g., Netlify, Vercel).

**Q: Can I use a different database?**
A: Yes! The backend is designed to work with MongoDB, but you can easily switch to another database by modifying the configuration in `application.properties`.
