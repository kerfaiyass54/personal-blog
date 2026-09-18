if (!db.getCollectionNames().includes("interests")) db.createCollection("interests");
db.interests.createIndex({ name: 1 }, { unique: true, name: "name_unique" });
