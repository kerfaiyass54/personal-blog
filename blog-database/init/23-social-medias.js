if (!db.getCollectionNames().includes("social_medias")) db.createCollection("social_medias");
db.social_medias.createIndex({ userId: 1 });
