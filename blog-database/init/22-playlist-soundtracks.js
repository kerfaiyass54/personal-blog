if (!db.getCollectionNames().includes("playlist_soundtracks")) db.createCollection("playlist_soundtracks");
db.playlist_soundtracks.createIndex({ playlistId: 1 });
db.playlist_soundtracks.createIndex({ soundtrackId: 1 });
