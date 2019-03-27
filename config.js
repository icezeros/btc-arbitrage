require('dotenv').config();
module.exports = {
  redis: {
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
  },
  mongodb: {
    url: process.env.MONGO_URL,
    options: {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
    },
  },
};
