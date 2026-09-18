[
  { _id: "social-sarah-github", name: "GitHub", link: "https://github.com/example-writer", description: "Open-source projects.", type: "GITHUB", userId: "user-writer-001" },
  { _id: "social-sarah-linkedin", name: "LinkedIn", link: "https://www.linkedin.com/in/example-writer", description: "Professional profile.", type: "LINKEDIN", userId: "user-writer-001" },
  { _id: "social-emily-github", name: "GitHub", link: "https://github.com/example-emily", description: "Frontend projects.", type: "GITHUB", userId: "user-reader-002" }
].forEach((doc) => db.social_medias.replaceOne({ _id: doc._id }, doc, { upsert: true }));
