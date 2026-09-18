if (!db.getCollectionNames().includes("favorites")) db.createCollection("favorites");
db.favorites.createIndex({ userId: 1, skillId: 1 }, { unique: true, name: "user_skill_unique" });
db.favorites.createIndex({ userId: 1 });
db.favorites.createIndex({ skillId: 1 });
