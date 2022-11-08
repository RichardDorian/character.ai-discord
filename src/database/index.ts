import { Client } from 'redis-om';

export const client = new Client();

export async function connect() {
  if (client.isOpen()) return;
  await client.open(process.env.REDIS_URL);
}
