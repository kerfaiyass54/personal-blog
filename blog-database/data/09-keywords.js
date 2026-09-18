[
  { _id: "keyword-mongodb", name: "MongoDB", skillName: "MongoDB" },
  { _id: "keyword-spring-boot", name: "Spring Boot", skillName: "Spring Boot" },
  { _id: "keyword-angular", name: "Angular", skillName: "Angular" },
  { _id: "keyword-docker", name: "Docker", skillName: "Docker" },
  { _id: "keyword-typescript", name: "TypeScript", skillName: "TypeScript" },
  { _id: "keyword-rest-api", name: "REST API", skillName: "Spring Boot" }
].forEach((doc) => db.keywords.replaceOne({ _id: doc._id }, doc, { upsert: true }));
