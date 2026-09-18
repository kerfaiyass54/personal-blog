[
  { _id: "recommendation-focus-flow", userId: "user-reader-001", email: "reader@example.com", soundtrackId: "soundtrack-deep-work", recommendations: [{ title: "Focus Flow", author: "Example Artist", source: "Spotify" }, { title: "Deep Concentration", author: "Example Artist", source: "YouTube" }], createdAt: new Date() },
  { _id: "recommendation-design-focus", userId: "user-reader-002", email: "emily@example.com", soundtrackId: "soundtrack-calm-reading", recommendations: [{ title: "Design Flow", author: "Example Composer", source: "Spotify" }, { title: "Reading Atmosphere", author: "Example Composer", source: "YouTube" }], createdAt: new Date() }
].forEach((doc) => db.recommendations.replaceOne({ _id: doc._id }, doc, { upsert: true }));
