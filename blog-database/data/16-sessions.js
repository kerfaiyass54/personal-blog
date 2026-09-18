const now = new Date();
[
  { _id: "session-reader-current", email: "reader@example.com", time: now, os: "Windows 11", browser: "Chrome", me: true, activityType: "NOTHING" },
  { _id: "session-reader-previous", email: "reader@example.com", time: new Date(now - 86400000), os: "Android", browser: "Chrome Mobile", me: false, activityType: "FIXED" },
  { _id: "session-emily-current", email: "emily@example.com", time: now, os: "macOS", browser: "Safari", me: true, activityType: "NOTHING" }
].forEach((doc) => db.sessions.replaceOne({ _id: doc._id }, doc, { upsert: true }));
