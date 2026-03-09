
// Create users collection
db.createCollection("users")

// Create unique index on email
db.users.createIndex({ email: 1 }, { unique: true })