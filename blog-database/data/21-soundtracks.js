[
  { _id: "soundtrack-deep-work", title: "Deep Work", link: "https://www.youtube.com/watch?v=example1", author: "Example Artist", type: "YOUTUBE", rate: 5, userId: "user-reader-001" },
  { _id: "soundtrack-focus-flow", title: "Focus Flow", link: "https://open.spotify.com/track/example2", author: "Example Artist", type: "SPOTIFY", rate: 4, userId: "user-reader-001" },
  { _id: "soundtrack-calm-reading", title: "Calm Reading", link: "https://www.youtube.com/watch?v=example3", author: "Example Composer", type: "YOUTUBE", rate: 4, userId: "user-reader-002" },
  { _id: "soundtrack-design-flow", title: "Design Flow", link: "https://open.spotify.com/track/example4", author: "Example Composer", type: "SPOTIFY", rate: 5, userId: "user-reader-002" }
].forEach((doc) => db.soundtracks.replaceOne({ _id: doc._id }, doc, { upsert: true }));
