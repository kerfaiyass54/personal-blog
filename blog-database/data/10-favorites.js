[
  { _id: "favorite-reader-mongodb", userId: "user-reader-001", skillId: "skill-mongodb" },
  { _id: "favorite-reader-angular", userId: "user-reader-001", skillId: "skill-angular" },
  { _id: "favorite-reader-spring", userId: "user-reader-001", skillId: "skill-spring-boot" },
  { _id: "favorite-emily-typescript", userId: "user-reader-002", skillId: "skill-typescript" },
  { _id: "favorite-emily-docker", userId: "user-reader-002", skillId: "skill-docker" }
].forEach((doc) => db.favorites.replaceOne({ _id: doc._id }, doc, { upsert: true }));
