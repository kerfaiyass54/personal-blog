[
  { _id: "saved-reader-spring", userEmail: "reader@example.com", articleId: "article-spring-mongodb" },
  { _id: "saved-emily-docker", userEmail: "emily@example.com", articleId: "article-docker-development" },
  { _id: "saved-john-typescript", userEmail: "reader@example.com", articleId: "article-typescript-types" }
].forEach((doc) => db.saveds.replaceOne({ _id: doc._id }, doc, { upsert: true }));
