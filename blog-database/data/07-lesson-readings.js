[
  { _id: "reading-john-mongodb", lessonId: "lesson-mongodb-basics", emailUser: "reader@example.com", dateLastRead: new Date(), progress: 60, read: false },
  { _id: "reading-emily-spring", lessonId: "lesson-spring-rest", emailUser: "emily@example.com", dateLastRead: new Date(), progress: 35, read: false },
  { _id: "reading-john-typescript", lessonId: "lesson-typescript-types", emailUser: "reader@example.com", dateLastRead: new Date(), progress: 100, read: true }
].forEach((doc) => db.lesson_readings.replaceOne({ _id: doc._id }, doc, { upsert: true }));
