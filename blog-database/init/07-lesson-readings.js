if (!db.getCollectionNames().includes("lesson_readings")) db.createCollection("lesson_readings");
db.lesson_readings.createIndex({ lessonId: 1, emailUser: 1 }, { unique: true, name: "lesson_user_unique" });
db.lesson_readings.createIndex({ lessonId: 1 });
db.lesson_readings.createIndex({ emailUser: 1 });
