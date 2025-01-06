module.exports = {
    async up(db) {
      await db.createCollection('posts', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['_id', 'content', 'likes', 'comments', 'username', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
            properties: {
              _id: { bsonType: 'string' },
              content: { bsonType: 'string' },
              mediaUrl: { bsonType: 'string' },
              likes: {
                bsonType: 'object',
                properties: {
                  likeCount: { bsonType: 'int' },
                  likedBy: { bsonType: 'array' },
                  dislikedBy: { bsonType: 'array' }
                }
              },
              comments: { bsonType: 'array' },
              username: { bsonType: 'string' },
              firstName: { bsonType: 'string' },
              lastName: { bsonType: 'string' },
              avatarURL: { bsonType: 'string' },
              createdAt: { bsonType: 'date' },
              updatedAt: { bsonType: 'date' }
            }
          }
        }
      });
    },
  
    async down(db) {
      await db.collection('posts').drop();
    }
  };
  