if (!db.getCollectionNames().includes("users")) db.createCollection("users");
db.users.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
db.users.createIndex({ profileId: 1 }, { unique: true, sparse: true, name: "profile_unique" });
