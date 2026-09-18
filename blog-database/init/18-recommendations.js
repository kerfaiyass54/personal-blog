if (!db.getCollectionNames().includes("recommendations")) db.createCollection("recommendations");
db.recommendations.createIndex({ userId: 1, soundtrackId: 1 }, { name: "user_soundtrack_idx" });
db.recommendations.createIndex({ userId: 1 });
db.recommendations.createIndex({ soundtrackId: 1 });
