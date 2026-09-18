[
  { _id: "explain-mongodb-references", content: "This platform uses application-managed String IDs instead of MongoDB DBRefs.", insertDate: new Date() },
  { _id: "explain-spring-repository", content: "Spring Data repositories provide a consistent abstraction for MongoDB queries.", insertDate: new Date() },
  { _id: "explain-docker-container", content: "A container packages an application and its runtime dependencies consistently.", insertDate: new Date() }
].forEach((doc) => db.explains.replaceOne({ _id: doc._id }, doc, { upsert: true }));
