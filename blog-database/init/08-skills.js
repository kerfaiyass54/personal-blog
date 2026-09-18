if (!db.getCollectionNames().includes("skills")) db.createCollection("skills");
db.skills.createIndex({ name: 1 }, { unique: true, name: "name_unique" });
