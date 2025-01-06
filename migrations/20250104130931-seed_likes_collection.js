const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(db) {
    await db.collection('likes').insertMany([
      {
        _id: uuidv4(),
        firstName: 'John',
        lastName: 'Doe',
        username: 'john_doe',
        avatarURL: 'https://example.com/avatars/john.jpg'
      },
      {
        _id: uuidv4(),
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'jane_smith',
        avatarURL: 'https://example.com/avatars/jane.jpg'
      },
      {
        _id: uuidv4(),
        firstName: 'Alice',
        lastName: 'Johnson',
        username: 'alice_johnson',
        avatarURL: 'https://example.com/avatars/alice.jpg'
      }
    ]);

    console.log('✅ Seed data added to the `likes` collection.');
  },

  async down(db) {
    await db.collection('likes').deleteMany({});
    console.log('⚠️ Seed data removed from the `likes` collection.');
  }
};
