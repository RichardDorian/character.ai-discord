import { Entity, Schema } from 'redis-om';
import { client, connect } from '.';

export interface IUser {
  entityId: string;

  discord: string;
  accessToken: string;
  refreshToken: string;
}
export class User extends Entity {}
export const userSchema = new Schema(
  User,
  {
    discord: { type: 'string' },
    accessToken: { type: 'string', caseSensitive: true },
    refreshToken: { type: 'string', caseSensitive: true },
  },
  { dataStructure: 'JSON' }
);

export async function createUser(data: {
  discord: string;
  accessToken: string;
  refreshToken: string;
}): Promise<string> {
  await connect();

  const repository = client.fetchRepository(userSchema);

  const user = repository.createEntity(data);
  return await repository.save(user);
}

export async function deleteUser(id: string) {
  await connect();

  const repository = client.fetchRepository(userSchema);

  await repository.remove(id);
}

export async function getUser(discord: string): Promise<IUser[] | null> {
  await connect();
  await createIndex();

  const repository = client.fetchRepository(userSchema);

  const users = await repository
    .search()
    .where('discord')
    .eq(discord)
    .return.first();

  return (users?.toJSON() as IUser[]) ?? null;
}

let indexed = false;

export async function createIndex() {
  if (indexed) return;

  await connect();

  const repository = client.fetchRepository(userSchema);
  await repository.createIndex();
}
