const now = new Date();
[
  { _id: "reset-demo-reader", email: "reader@example.com", code: "482913", expiration: new Date(now.getTime() + 900000), used: false },
  { _id: "reset-demo-emily", email: "emily@example.com", code: "739204", expiration: new Date(now.getTime() + 900000), used: false }
].forEach((doc) => db.resets.replaceOne({ _id: doc._id }, doc, { upsert: true }));
