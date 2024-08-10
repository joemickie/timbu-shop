import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'; // Import FastifyRequest and FastifyReply types
import { getItems, addItem } from '../controllers/itemController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { Item } from '../models/itemModel';

export const itemRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/items', { preHandler: [authMiddleware] }, getItems);

  fastify.post('/items', {
    preHandler: [authMiddleware],
    schema: {
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'description', 'created_at'],
      },
    },
    handler: async (request: FastifyRequest<{ Body: Item }>, reply: FastifyReply) => {
      // Ensure the request body matches the expected type
      await addItem(request, reply);
    },
  });
};
