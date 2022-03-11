export const testData = [
  {
    name: "insert user",
    model: "User",
    method: "create",
    input: {
      userId: "user1",
      defaultDelegate: "user2",
      profileUsername: "user1",
      profileEmail: "user1@example.com",
    },
    query:
      "SELECT userId, defaultDelegate, profileUsername, profileEmail from users where userId = ?",
    params: ["user1"],
    expected: {
      userId: "user1",
      defaultDelegate: "user2",
      profileUsername: "user1",
      profileEmail: "user1@example.com",
    },
  },
];
