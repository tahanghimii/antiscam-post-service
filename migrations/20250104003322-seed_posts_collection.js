module.exports = {
    async up(db) {
      await db.collection('posts').insertMany([
        {
          _id: "uuid-1",
          content: "This is the first seeded post",
          mediaUrl: "https://example.com/media1.jpg",
          likes: {
            likeCount: 2,
            likedBy: [
              {
                _id: "uuid-user1",
                firstName: "John",
                lastName: "Doe",
                username: "johndoe",
                avatarURL: "https://example.com/avatar1.jpg"
              },
            ],
            dislikedBy: []
          },
          comments: [
            {
              _id: "uuid-comment1",
              firstName: "Jane",
              lastName: "Smith",
              username: "janesmith",
              avatarURL: "https://example.com/avatar2.jpg",
              text: "Nice post!",
              votes: {
                upvotedBy: [],
                downvotedBy: []
              },
              createdAt: new Date()
            }
          ],
          username: "johndoe",
          firstName: "John",
          lastName: "Doe",
          avatarURL: "https://example.com/avatar1.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    },
  
    async down(db) {
      await db.collection('posts').deleteMany({ username: "johndoe" });
    }
  };
  