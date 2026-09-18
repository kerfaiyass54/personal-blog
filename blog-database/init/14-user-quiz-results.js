if (!db.getCollectionNames().includes("user_quiz_results")) db.createCollection("user_quiz_results");
db.user_quiz_results.createIndex({ userId: 1, quizId: 1 }, { name: "user_quiz_idx" });
db.user_quiz_results.createIndex({ userId: 1 });
db.user_quiz_results.createIndex({ quizId: 1 });
