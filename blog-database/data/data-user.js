db.users.insertMany([
{
    name: "John Reader",
    email: "john.reader@example.com",
    password: "password123",
    role: "READER",
    passwordChangedAt: new Date()
},
{
    name: "Sarah Writer",
    email: "sarah.writer@example.com",
    password: "password123",
    role: "WRITER",
    passwordChangedAt: new Date()
},
{
    name: "Michael Reader",
    email: "michael.reader@example.com",
    password: "password123",
    role: "READER",
    passwordChangedAt: new Date()
}
])