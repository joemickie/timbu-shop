import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { itemRoutes } from './routes/itemRoutes';
import { connectDB } from './utils/db';
import { config } from './config';

const server = Fastify();

server.register(fastifyJwt, { secret: config.jwtSecret });

server.register(itemRoutes);

const start = async () => {
  try {
    await connectDB();
    await server.listen(config.port);
    console.log(`Server is listening on port ${config.port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
