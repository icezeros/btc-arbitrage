const Redis = require('ioredis');
const config = require('./config');
const redis = new Redis(process.env.REDISCLOUD_URL);
// const redis = new Redis({
//     port: config.redis.port, // Redis port
//     host: config.redis.host, // Redis host
//     // family: 4, // 4 (IPv4) or 6 (IPv6)
//     password: config.redis.password,
//     db: config.redis.db,
// });

module.exports = redis;
