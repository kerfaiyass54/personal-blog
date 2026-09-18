[
  { _id: "lesson-mongodb-basics", title: "MongoDB Relationships for Application Developers", content: "Learn how to model references, indexes, and embedded documents.", dateInsert: new Date() },
  { _id: "lesson-spring-rest", title: "Designing REST APIs with Spring Boot", content: "Build maintainable controllers, services, DTOs, and validation rules.", dateInsert: new Date() },
  { _id: "lesson-typescript-types", title: "TypeScript Types for Angular Applications", content: "Use strict typing to model API responses and prevent runtime errors.", dateInsert: new Date() }
].forEach((doc) => db.lessons.replaceOne({ _id: doc._id }, doc, { upsert: true }));
