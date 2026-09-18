if (!db.getCollectionNames().includes("flashcards")) db.createCollection("flashcards");
db.flashcards.createIndex({ lessonId: 1 });
