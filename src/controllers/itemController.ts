import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllItems, createItem } from '../services/itemService';
import { Item } from '../models/itemModel';

// Define the expected request type for addItem
interface AddItemRequest extends FastifyRequest {
  Body: Item;
}

export const getItems = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const items = await getAllItems();
    reply.send(items);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch items' });
  }
};

export const addItem = async (request: FastifyRequest<{ Body: Item }>, reply: FastifyReply) => {
  try {
    const item = request.body as Item; // Explicitly cast body to Item
    await createItem(item);
    reply.status(201).send({ message: 'Item created' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to create item' });
  }
};
