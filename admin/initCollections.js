import { getDb, client } from './mongoClient.js';

async function initCollections() {
  const db = await getDb();
  const existing = await db.listCollections({}, { nameOnly: true }).toArray();
  const names = existing.map(c => c.name);
  const required = ['bookings', 'rooms', 'guest'];
  const toCreate = required.filter(n => !names.includes(n));
  for (const name of toCreate) {
    await db.createCollection(name);
    console.log('Created collection:', name);
  }
  console.log('Ensured collections:', required);
}

initCollections()
  .then(() => client.close())
  .catch(err => {
    console.error(err);
    client.close().finally(() => process.exit(1));
  });