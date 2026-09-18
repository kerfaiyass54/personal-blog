[
  { _id: "quiz-mongodb-basics", lessonId: "lesson-mongodb-basics", lessonTitle: "MongoDB Relationships for Application Developers", numberOfQuestions: 2 },
  { _id: "quiz-spring-rest", lessonId: "lesson-spring-rest", lessonTitle: "Designing REST APIs with Spring Boot", numberOfQuestions: 2 },
  { _id: "quiz-typescript-types", lessonId: "lesson-typescript-types", lessonTitle: "TypeScript Types for Angular Applications", numberOfQuestions: 2 }
].forEach((doc) => db.quizzes.replaceOne({ _id: doc._id }, doc, { upsert: true }));
