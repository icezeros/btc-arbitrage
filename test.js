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
    console.log('============ arrQC =============');
    // // console.log(data.arrQC);
    // const data = await redis.hkeys('binance:hash:BTC');

    // _.forEach(data, v => {
    //     // const tmpArr = v.split('/');
    //     const XBTC = ticker[`${v}/BTC`];
    //     const XQC = ticker[v];
    //     const BTCQC = ticker['BTC/USDT'];
    //     if (XBTC) {
    //         const TR_PRICE = new BigNumber(XBTC.info.last).times(new BigNumber(BTCQC.info.last));
    //         const XQC_PRICE = new BigNumber(XQC.info.last);
    //         const percent = TR_PRICE.minus(XQC_PRICE)
    //             .dividedBy(XQC_PRICE)
    //             .times(100);
    //         // console.log(`============ ${v} =============`);
    //         // console.log(TR_PRICE);
    //         // console.log(XQC_PRICE);
    //         // console.log(percent);
    //         // console.log();
    //         if (percent > 10) {
    //             console.log(`============ ${v} =============`);
    //             console.log(percent);
    //             console.log(TR_PRICE);
    //             console.log(XQC_PRICE);
    //             console.log(XBTC.info);
    //             console.log(XQC.info);
    //             console.log(BTCQC.info);
    //             console.log();
    //         }
    //     }
    // });
};

module.exports = { getMarket };
