if (!db.getCollectionNames().includes("soundtracks")) db.createCollection("soundtracks");
db.soundtracks.createIndex({ title: 1 });
db.soundtracks.createIndex({ userId: 1 });
