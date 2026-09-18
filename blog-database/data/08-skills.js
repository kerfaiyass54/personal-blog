[
  { _id: "skill-java", name: "Java", field: "Backend Development" },
  { _id: "skill-angular", name: "Angular", field: "Frontend Development" },
  { _id: "skill-mongodb", name: "MongoDB", field: "Database" },
  { _id: "skill-spring-boot", name: "Spring Boot", field: "Backend Development" },
  { _id: "skill-typescript", name: "TypeScript", field: "Frontend Development" },
  { _id: "skill-docker", name: "Docker", field: "DevOps" }
].forEach((doc) => db.skills.replaceOne({ _id: doc._id }, doc, { upsert: true }));
