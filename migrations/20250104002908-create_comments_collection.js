module.exports = {
    async up(db) {
      await db.createCollection('comments', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['_id', 'firstName', 'lastName', 'username', 'text', 'createdAt'],
            properties: {
              _id: { bsonType: 'string' },
              firstName: { bsonType: 'string' },
              lastName: { bsonType: 'string' },
              username: { bsonType: 'string' },
              avatarURL: { bsonType: 'string' },
              text: { bsonType: 'string' },
              votes: {
                bsonType: 'object',
                properties: {
                  upvotedBy: { bsonType: 'array' },
                  downvotedBy: { bsonType: 'array' }
                }
              },
              createdAt: { bsonType: 'date' }
            }
          }
        }
      });
    },
  
    async down(db) {
      await db.collection('comments').drop();
    }
  };
  