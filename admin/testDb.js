import { getDb, client } from './mongoClient.js';

async function testDb() {
  const db = await getDb();
  const rooms = db.collection('rooms');
  const guests = db.collection('guest');

  const roomDoc = { number: 999, type: 'test-suite', available: true, createdAt: new Date() };
  const guestDoc = { name: 'Test Guest', email: 'test+db@example.com', createdAt: new Date() };

  const rRes = await rooms.insertOne(roomDoc);
  const gRes = await guests.insertOne(guestDoc);

  console.log('Inserted room id:', rRes.insertedId.toString());
  console.log('Inserted guest id:', gRes.insertedId.toString());

  const sampleRooms = await rooms.find({}).limit(5).toArray();
  const sampleGuests = await guests.find({}).limit(5).toArray();

  console.log('Rooms sample:', sampleRooms);
  console.log('Guests sample:', sampleGuests);

  // Cleanup inserted docs
  await rooms.deleteOne({ _id: rRes.insertedId });
  await guests.deleteOne({ _id: gRes.insertedId });

  await client.close();
}

testDb()
  .catch(err => {
    console.error(err);
    client.close().finally(() => process.exit(1));
  });
