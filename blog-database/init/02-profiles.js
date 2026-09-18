if (!db.getCollectionNames().includes("profiles")) db.createCollection("profiles");
db.profiles.createIndex({ userId: 1 }, { unique: true, name: "user_unique" });
