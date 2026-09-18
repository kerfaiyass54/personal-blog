if (!db.getCollectionNames().includes("playlists")) db.createCollection("playlists");
db.playlists.createIndex({ userId: 1 });
