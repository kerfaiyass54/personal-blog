if (!db.getCollectionNames().includes("quizzes")) db.createCollection("quizzes");
db.quizzes.createIndex({ lessonId: 1 });
