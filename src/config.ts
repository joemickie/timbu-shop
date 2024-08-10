import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  db: {
    contactPoints: [process.env.DB_CONTACT_POINTS || '127.0.0.1'],
    localDataCenter: process.env.DB_LOCAL_DATACENTER || 'datacenter1',
    keyspace: process.env.DB_KEYSPACE || 'mykeyspace'
  }
};
