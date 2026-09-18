[
  { _id: "interest-technology", name: "Technology", interestType: "TECHNOLOGY", description: "Software engineering and artificial intelligence.", profileIds: ["profile-writer-001", "profile-reader-001", "profile-reader-002"] },
  { _id: "interest-literature", name: "Literature", interestType: "LITERATURE", description: "Technical books and long-form writing.", profileIds: ["profile-writer-001"] },
  { _id: "interest-sport", name: "Sport", interestType: "SPORT", description: "Regular exercise and outdoor activities.", profileIds: ["profile-reader-001"] },
  { _id: "interest-science", name: "Science", interestType: "SCIENCE", description: "Scientific discoveries and research.", profileIds: [] }
].forEach((doc) => db.interests.replaceOne({ _id: doc._id }, doc, { upsert: true }));
