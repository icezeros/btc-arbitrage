const ccxt = require('ccxt');
const moment = require('moment');
const _ = require('lodash');
const BigNumber = require('bignumber.js');

let zb = new ccxt.binance();

const getMarket = async () => {
    const symbol = 'ETH/USDT';
    const startTime = moment();
    // const ticker = await zb.fetchTicker(symbol);
    const ticker = await zb.fetchTickers();
    // const ticker = await zb.fetchOrderBook(symbol);
    // const ticker = await zb.loadMarkets();
    const arrQC = [];
    const arrUSDT = [];
    const arrETH = [];
    const arrBTC = [];
    const arrZB = [];
    _.forEach(ticker, (v, k) => {
        console.log('============ ticker =============');
        console.log(k);
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
        if (k.endsWith('ZB')) {
            arrZB.push(k);
        }
    });

    console.log('============ arrQC =============');
    console.log(arrQC);
    console.log(arrUSDT);
    console.log(arrETH);
    console.log(arrBTC);
    console.log(arrZB);
    console.log('============ ticker =============');
};

module.exports = { getMarket };
