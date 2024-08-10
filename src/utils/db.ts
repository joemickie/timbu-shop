import { Client } from 'cassandra-driver';
import { config } from '../config';

const client = new Client({
  contactPoints: config.db.contactPoints,
  localDataCenter: config.db.localDataCenter,
  keyspace: config.db.keyspace
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to ScyllaDB');
  } catch (error) {
    console.error('Failed to connect to ScyllaDB', error);
  }
};

export default client;
