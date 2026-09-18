[
  { _id: "profile-writer-001", firstName: "Sarah", lastName: "Writer", job: "Software Engineer", birthDate: ISODate("1992-04-15"), nationality: "French", city: "Paris", interestIds: ["interest-technology", "interest-literature"], userId: "user-writer-001" },
  { _id: "profile-reader-001", firstName: "John", lastName: "Reader", job: "Computer Science Student", birthDate: ISODate("2000-09-20"), nationality: "British", city: "London", interestIds: ["interest-technology", "interest-sport"], userId: "user-reader-001" },
  { _id: "profile-reader-002", firstName: "Emily", lastName: "Reader", job: "Product Designer", birthDate: ISODate("1997-11-08"), nationality: "Canadian", city: "Toronto", interestIds: ["interest-technology"], userId: "user-reader-002" }
].forEach((doc) => db.profiles.replaceOne({ _id: doc._id }, doc, { upsert: true }));
