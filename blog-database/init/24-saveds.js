if (!db.getCollectionNames().includes("saveds")) db.createCollection("saveds");
db.saveds.createIndex({ userEmail: 1 });
db.saveds.createIndex({ articleId: 1 });
