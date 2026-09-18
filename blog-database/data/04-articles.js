const now = new Date();
[
  { _id: "article-spring-mongodb", title: "Building a Spring Boot API with MongoDB", content: "A practical introduction to documents, repositories, indexes, and REST endpoints.", dateInsert: now, dateUpdate: now },
  { _id: "article-angular-services", title: "Organizing Angular Services", content: "How to keep API communication and UI components maintainable.", dateInsert: now, dateUpdate: now },
  { _id: "article-docker-development", title: "Using Docker for Local Development", content: "Learn how containers make local databases and services reproducible.", dateInsert: now, dateUpdate: now },
  { _id: "article-typescript-types", title: "Practical TypeScript Type Design", content: "Use interfaces, unions, and generics to make frontend code safer.", dateInsert: now, dateUpdate: now }
].forEach((doc) => db.articles.replaceOne({ _id: doc._id }, doc, { upsert: true }));
