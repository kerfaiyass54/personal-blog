if (!db.getCollectionNames().includes("skill_recommendations")) db.createCollection("skill_recommendations");
db.skill_recommendations.createIndex({ skillId: 1 });
