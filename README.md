
# **Personal Blog Platform** 🌟

[![My Skills](https://skillicons.dev/icons?i=py,docker,spring,angular,bootstrap,css,git,github,html,idea,mongodb,npm,postman,githubactions,postgres,elasticsearch)](https://skillicons.dev)


A **modern, full-stack personal blog platform** built with **TypeScript, Angular, and Spring Boot**, designed for both content creators and readers. Perfect for sharing articles, IT lessons, and technical explanations with a clean, intuitive interface and robust backend.

---

## ✨ **Key Features**

### **For Writers**
✅ **Content Creation & Management**
- Write, edit, and publish articles and technical lessons
- Rich text editor for formatting content
- Keyword and skill tagging for better organization

✅ **User Authentication & Security**
- JWT-based authentication
- Role-based access control (Writer/Reader)
- Secure login and registration with password recovery

✅ **Session Management**
- Track login sessions with OS and browser detection
- Alerts for suspicious login activities
- Session history for security monitoring

### **For Readers**
✅ **Seamless Reading Experience**
- Clean, responsive UI with intuitive navigation
- Search and filter articles by tags, skills, and topics
- Access to structured lessons and summaries

✅ **Personalized Content**
- AI-powered recommendations for related articles
- Easy-to-navigate dashboard with categorized content

### **Backend & Infrastructure**
✅ **Scalable Architecture**
- MongoDB for flexible data storage
- Elasticsearch for fast and relevant search
- RESTful API design for seamless integration

✅ **Performance & Reliability**
- Optimized for high traffic
- Docker support for easy deployment
- GitHub Actions for CI/CD pipelines

---

## 🛠️ **Tech Stack**

### **Frontend**
- **Framework**: Angular 21
- **Styling**: SCSS, Bootstrap 5
- **State Management**: RxJS
- **UI Components**: Material Design, Bootstrap Icons
- **Notifications**: ngx-toastr
- **Authentication**: JWT Decode
- **WebSockets**: STOMP.js

### **Backend**
- **Framework**: Spring Boot 4.0.0
- **Language**: TypeScript (Frontend), Java 21 (Backend)
- **Database**: MongoDB
- **Search Engine**: Elasticsearch
- **Security**: JWT, Spring Security
- **Validation**: Spring Validation
- **Build Tool**: Maven

### **DevOps & Tools**
- **IDE**: IntelliJ IDEA / VS Code
- **Package Manager**: npm / yarn
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Testing**: JUnit (Backend), Jasmine + Karma (Frontend)

---

## 📦 **Installation**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** v20+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Angular CLI** (`npm install -g @angular/cli@21`)
- **Java JDK 21** ([Download](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html))
- **Maven 3.9.11** ([Download](https://maven.apache.org/download.cgi))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))
- **Python** (for backend scripts if needed)

---

### **Quick Start**

#### **1. Clone the Repository**
```bash
git clone https://github.com/kerfaiyass54/personal-blog.git
cd personal-blog
```

#### **2. Set Up the Backend**
```bash
# Navigate to the backend directory
cd blog-backend

# Build and run the Spring Boot application
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8083`.

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

### **Environment Configuration**
Configure the backend using the `.env` file or `application.properties` in `blog-backend/src/main/resources`:

```properties
# MongoDB Configuration
spring.mongodb.uri=mongodb://localhost:27017/blog_database

# Email Configuration (for password recovery)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.username=your-email@gmail.com
spring.mail.password=your-email-password
email=noreply@blogproject.com

# Server Port
server.port=8083
```


## 🔧 **Configuration**

### **Environment Variables**
Create a `.env` file in the root directory for local development:

```env
# Frontend
NODE_ENV=development
API_BASE_URL=http://localhost:8083/api

# Backend (in application.properties)
spring.mongodb.uri=mongodb://localhost:27017/blog_database
spring.mail.username=your-email@gmail.com
spring.mail.password=your-email-password
```

### **Customization**
- **Backend**: Modify `application.properties` in `blog-backend/src/main/resources` for database connections, ports, and other configurations.
- **Frontend**: Update `angular.json` to change build configurations, assets, and styles.
- **Themes**: Customize the UI by modifying SCSS files in the `src/styles` directory.

---

## 🤝 **Contributing**

We welcome contributions from the community! Here’s how you can get involved:

### **Development Setup**
1. **Fork** the repository.
2. **Clone** your fork locally.
3. **Install** dependencies:
   ```bash
   cd blog-backend && ./mvnw install
   cd ../blog-frontend && npm install
   ```
4. **Run** the application:
   ```bash
   cd blog-backend && ./mvnw spring-boot:run
   cd ../blog-frontend && npm start
   ```

### **Code Style Guidelines**
- **TypeScript**: Follow TypeScript best practices and use interfaces for complex data structures.
- **Angular**: Use standalone components where applicable and follow Angular’s style guide.
- **Java**: Follow Spring Boot conventions and use Lombok for reducing boilerplate code.
- **Testing**: Write unit tests for critical components and ensure test coverage is maintained.

### **Pull Request Process**
1. **Create** a new branch for your feature or bug fix.
2. **Commit** changes with clear, concise messages.
3. **Push** your branch and open a **Pull Request** to the `main` branch.
4. **Review**: Your PR will be reviewed by maintainers. Address any feedback and iterate as needed.

---



## 🚀 **Get Started Today!**

Ready to build your personal blog platform? Follow the steps above to set up and start contributing. Whether you're a developer looking to enhance your skills or a content creator wanting a robust platform, this project is for you!

🌟 **Star this repository** to show your support and stay updated with the latest developments!

Happy coding! 💻🚀

