const ccxt = require('ccxt');
const moment = require('moment');
const _ = require('lodash');
const BigNumber = require('bignumber.js');
const redis = require('./redis');

// let exchange = new ccxt.binance();
let exchangeSymbol = 'binance';
// let exchangeSymbol = 'binance';
let exchange = new ccxt[exchangeSymbol]();

const getMarket = async () => {
    const symbol = 'ETH/USDT';
    const startTime = moment();
    // const ticker = await exchange.fetchTicker(symbol);
    const ticker = await exchange.fetchTickers();
    // const ticker = await exchange.fetchOrderBook(symbol);
    // const ticker = await exchange.loadMarkets();

    _.forEach(ticker, async (v, k) => {
        const arr = k.split('/');
        try {
            await redis.set(`${exchangeSymbol}:${arr[1]}:${arr[0]}`, JSON.stringify(v), 'EX', 60 * 60);
            await redis.sadd(`${exchangeSymbol}:set:${arr[1]}`, arr[0], 'EX', 60 * 60);
            await redis.hset(`${exchangeSymbol}:hash:${arr[1]}`, arr[0], JSON.stringify(v), 'EX', 60 * 60);
        } catch (error) {
            console.log('============ error =============');
            console.log(error);
        }
    });
};

module.exports = { getMarket };
