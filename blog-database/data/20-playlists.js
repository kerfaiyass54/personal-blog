[
  { _id: "playlist-focus-coding", title: "Focus Coding", description: "Instrumental tracks for development sessions.", rate: 5, userId: "user-reader-001" },
  { _id: "playlist-design-focus", title: "Design Focus", description: "Calm music for reading and design work.", rate: 4, userId: "user-reader-002" }
].forEach((doc) => db.playlists.replaceOne({ _id: doc._id }, doc, { upsert: true }));
