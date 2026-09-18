[
  { _id: "playlist-track-deep-work", playlistId: "playlist-focus-coding", soundtrackId: "soundtrack-deep-work" },
  { _id: "playlist-track-focus-flow", playlistId: "playlist-focus-coding", soundtrackId: "soundtrack-focus-flow" },
  { _id: "playlist-design-calm", playlistId: "playlist-design-focus", soundtrackId: "soundtrack-calm-reading" },
  { _id: "playlist-design-flow", playlistId: "playlist-design-focus", soundtrackId: "soundtrack-design-flow" }
].forEach((doc) => db.playlist_soundtracks.replaceOne({ _id: doc._id }, doc, { upsert: true }));
