FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk
WORKDIR /backend
COPY --from=build /app/target/*.jar blog-backend.jar

EXPOSE 8083

ENTRYPOINT ["java","-jar","app.jar"]