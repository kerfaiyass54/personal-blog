if (!db.getCollectionNames().includes("questions")) db.createCollection("questions");
db.questions.createIndex({ quizId: 1 });
