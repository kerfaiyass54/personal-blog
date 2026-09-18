if (!db.getCollectionNames().includes("sessions")) db.createCollection("sessions");
db.sessions.createIndex({ email: 1, time: -1 }, { name: "email_time_idx" });
db.sessions.createIndex({ email: 1 });
db.sessions.createIndex({ time: -1 });
