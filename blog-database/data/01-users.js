const now = new Date();
[
  { _id: "user-writer-001", name: "Sarah Writer", email: "writer@example.com", password: "password123", role: "WRITER", passwordChangedAt: now, profileId: "profile-writer-001" },
  { _id: "user-reader-001", name: "John Reader", email: "reader@example.com", password: "password123", role: "READER", passwordChangedAt: now, profileId: "profile-reader-001" },
  { _id: "user-reader-002", name: "Emily Reader", email: "emily@example.com", password: "password123", role: "READER", passwordChangedAt: now, profileId: "profile-reader-002" }
].forEach((doc) => db.users.replaceOne({ _id: doc._id }, doc, { upsert: true }));
