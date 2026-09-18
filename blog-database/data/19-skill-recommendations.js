[
  { _id: "skill-recommendation-mongodb", skillId: "skill-mongodb", skillName: "MongoDB", field: "Database", recommendations: ["Practice aggregation pipelines.", "Learn compound indexes and query plans."] },
  { _id: "skill-recommendation-spring", skillId: "skill-spring-boot", skillName: "Spring Boot", field: "Backend Development", recommendations: ["Build a REST API with DTO validation.", "Add repository integration tests."] },
  { _id: "skill-recommendation-typescript", skillId: "skill-typescript", skillName: "TypeScript", field: "Frontend Development", recommendations: ["Enable strict mode.", "Use discriminated unions for UI state."] }
].forEach((doc) => db.skill_recommendations.replaceOne({ _id: doc._id }, doc, { upsert: true }));
