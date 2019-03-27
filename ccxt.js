const ccxt = require('ccxt');
const moment = require('moment');
const _ = require('lodash');
const BigNumber = require('bignumber.js');
const data = require('./data');

let zb = new ccxt.zb();

// console.log(JSON.stringify(ccxt.exchanges));

// let exchange = new ccxt.kraken(); // default id
// let kraken1 = new ccxt.kraken({ id: 'kraken1' });
// let kraken2 = new ccxt.kraken({ id: 'kraken2' });
// let id = 'gdax';
// let gdax = new ccxt[id]();

// // // from variable id
// // const exchangeId = 'zb',
// //     exchangeClass = ccxt[exchangeId],
// //     exchange = new exchangeClass({
// //         apiKey: 'YOUR_API_KEY',
// //         secret: 'YOUR_SECRET',
// //         timeout: 30000,
// //         enableRateLimit: true,
// //     });
(async () => {
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
    // console.log('============ arrQC =============');
    // // console.log(data.arrQC);
    // _.forEach(data.arrUSDT, (v, k) => {
    //     const tmpArr = v.split('/');
    //     const XBTC = ticker[`${tmpArr[0]}/BTC`];
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

    console.log('============ arrQC =============');
    // console.log(arrQC);
    // console.log(arrUSDT);
    // console.log(arrETH);
    // console.log(arrBTC);
    // console.log(arrZB);
    console.log('============ ticker =============');
    // console.log(ticker);
    // console.log(arr);
    const endTime = moment();
    console.log('============ during =============');
    console.log(endTime - startTime);

    // let markets = await zb.load_markets();
    // console.log(zb.id);
    // console.log('============ zb =============');
    // console.log( zb.deepExtend());
    // console.log(await zb.fetchTicker('BTC/USD'));
})();

// async function fetchOrderBook(symbol) {
//     const ticker = await zb.fetchOrderBook(symbol);
//     console.log('============ ticker =============');
//     console.log(ticker);
// }

// fetchOrderBook('BTM/QC')
