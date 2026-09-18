[
  { _id: "flashcard-mongodb-document", lessonId: "lesson-mongodb-basics", lessonTitle: "MongoDB Relationships for Application Developers", type: "DEFINITION", term: "Document", value: "A JSON-like record stored inside a MongoDB collection." },
  { _id: "flashcard-mongodb-index", lessonId: "lesson-mongodb-basics", lessonTitle: "MongoDB Relationships for Application Developers", type: "CONCEPT", term: "Index", value: "A data structure that improves query performance." },
  { _id: "flashcard-spring-controller", lessonId: "lesson-spring-rest", lessonTitle: "Designing REST APIs with Spring Boot", type: "DEFINITION", term: "Controller", value: "A Spring component that receives HTTP requests." },
  { _id: "flashcard-spring-dto", lessonId: "lesson-spring-rest", lessonTitle: "Designing REST APIs with Spring Boot", type: "CONCEPT", term: "DTO", value: "An object used to transfer data between application layers." },
  { _id: "flashcard-typescript-interface", lessonId: "lesson-typescript-types", lessonTitle: "TypeScript Types for Angular Applications", type: "DEFINITION", term: "Interface", value: "A compile-time contract describing an object shape." }
].forEach((doc) => db.flashcards.replaceOne({ _id: doc._id }, doc, { upsert: true }));
