const ccxt = require('ccxt');
const moment = require('moment');
const _ = require('lodash');
const BigNumber = require('bignumber.js');
const redis = require('./redis');

// let exchange = new ccxt.binance();
let exchangeSymbol = 'zb';
let exchange = new ccxt[exchangeSymbol]();

const getMarket = async () => {
    const symbol = 'ETH/USDT';
    const startTime = moment();
    // const ticker = await exchange.fetchTicker(symbol);
    const ticker = await exchange.fetchTickers();
    console.log('============ ticker =============');
    console.log(ticker);
    // const ticker = await exchange.fetchOrderBook(symbol);
    // const ticker = await exchange.loadMarkets();
    const arrQC = [];
    const arrUSDT = [];
    const arrETH = [];
    const arrBTC = [];
    const arrexchange = [];
    _.forEach(ticker, async (v, k) => {
        const arr = k.split('/');
        console.log('============ arr =============');
        console.log(arr);
        console.log('============ `exchange:${arr[1]}:${arr[0]}`, JSON.stringify(v) =============');
        console.log(`${exchangeSymbol}:${arr[1]}:${arr[0]}`, JSON.stringify(v));
        await redis.set(`exchange:${arr[1]}:${arr[0]}`, JSON.stringify(v), 'EX', 60 * 60);
        if (k.endsWith('QC')) {
            arrQC.push(k);
        }
        if (k.endsWith('USDT')) {
            arrUSDT.push(k);
        }
        if (k.endsWith('ETH')) {
            arrETH.push(k);
        }
        if (k.endsWith('BTC')) {
            arrBTC.push(k);
        }
        if (k.endsWith('exchange')) {
            arrexchange.push(k);
        }
    });

    console.log('============ arrQC =============');
    console.log(arrQC);
    console.log(arrUSDT);
    console.log(arrETH);
    console.log(arrBTC);
    console.log(arrexchange);
    console.log('============ ticker =============');
};

module.exports = { getMarket };
