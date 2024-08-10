import client from '../utils/db';
import { Item } from '../models/itemModel';

export const getAllItems = async (): Promise<Item[]> => {
  const result = await client.execute('SELECT * FROM items');
  
  // Map the rows to the Item type
  const items: Item[] = result.rows.map(row => ({
    id: row['id'],
    name: row['name'],
    description: row['description'],
    created_at: row['created_at'],
  }));

  return items;
};

export const createItem = async (item: Item): Promise<void> => {
  const query = 'INSERT INTO items (id, name, description, created_at) VALUES (?, ?, ?, ?)';
  await client.execute(query, [item.id, item.name, item.description, item.created_at], { prepare: true });
};
