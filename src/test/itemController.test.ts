import { expect } from 'chai';
import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import { itemRoutes } from '../routes/itemRoutes';
import { config } from '../config';
import { Item } from '../models/itemModel';
import { FastifyInstance } from 'fastify';

// Define the type for the server instance
type FastifyServer = FastifyInstance;

describe('Item API', () => {
  let server: FastifyServer;

  before(async () => {
    server = Fastify();
    server.register(fastifyJwt, { secret: config.jwtSecret });
    server.register(itemRoutes);

    await server.ready();
  });

  it('should return 200 and list of items', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/items',
      headers: {
        authorization: `Bearer ${server.jwt.sign({ user: 'test' })}`
      }
    });

    expect(response.statusCode).to.equal(200);
    expect(response.json()).to.be.an('array');
  });

  it('should return 201 and create an item', async () => {
    const newItem: Item = {
      id: '1',
      name: 'Item 1',
      description: 'This is item 1',
      created_at: new Date() // Use Date object directly
    };

    const response = await server.inject({
      method: 'POST',
      url: '/items',
      headers: {
        authorization: `Bearer ${server.jwt.sign({ user: 'test' })}`
      },
      payload: newItem
    });

    expect(response.statusCode).to.equal(201);
    expect(response.json().message).to.equal('Item created');
  });
});
