module.exports = {
    async up(db) {
      await db.createCollection('likes', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['_id', 'firstName', 'lastName', 'username'],
            properties: {
              _id: { bsonType: 'string' },
              firstName: { bsonType: 'string' },
              lastName: { bsonType: 'string' },
              username: { bsonType: 'string' },
              avatarURL: { bsonType: 'string' }
            }
          }
        }
      });
    },
  
    async down(db) {
      await db.collection('likes').drop();
    }
  };
  