const redis = require('./redis');

(async () => {
    const result = await redis.hkeys('binance:hash:BTC');
    console.log('============ result =============');
    console.log(result);
})();
