import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://shanawarn8n:shanawarn8n@cluster0.mtl33q8.mongodb.net/firstdb';
const client = new MongoClient(uri);

let dbInstance = null;

export async function getDb() {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db('firstdb');
  }
  return dbInstance;
}

export { client };