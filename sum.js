const redis = require('./redis');
const BigNumber = require('bignumber.js');
const moment = require('moment');

async function sum() {
    const data = await redis.hkeys('binance:hash:BTC');
    // console.log('============ data =============');
    // console.log(data);

    for (let v of data) {
        const XBTC = await getChainInfo(`${v}/BTC`);
        const XUSDT = await getChainInfo(`${v}/USDT`);
        const BTCUSDT = await getChainInfo('BTC/USDT');
        // console.log();
        // console.log();
        // console.log();

        if (XBTC && XBTC.info && XUSDT && XUSDT.info && BTCUSDT) {
            try {
                const TR_PRICE = new BigNumber(XBTC.info.lastPrice).times(new BigNumber(BTCUSDT.info.lastPrice));
                const XUSDT_PRICE = new BigNumber(XUSDT.info.lastPrice);
                const percent = TR_PRICE.minus(XUSDT_PRICE)
                    .dividedBy(XUSDT_PRICE)
                    .times(100);

                if (percent > 5) {
                    console.log(`============ ${v} =============`);
                    console.log(percent);
                    console.log(`btc/usdt-->${v}/btc-->${v}/usdt`, TR_PRICE);
                    console.log(`${v}/usdt`, XUSDT_PRICE);
                    console.log(XBTC.info);
                    console.log(XUSDT.info);
                    console.log(BTCUSDT.info);
                    console.log();
                }
            } catch (error) {
                console.log('============  =============');
                console.log(error);
            }
        }
    }
}

async function getChainInfo(chain) {
    const tmpArr = chain.split('/');
    const chainInfo = await redis.hget(`binance:hash:${tmpArr[1]}`, tmpArr[0]);
    return JSON.parse(chainInfo);
}
sum();
async function fetchOrderBook(symbol) {
    const ccxt = require('ccxt');
    const exchangeSymbol = 'binance';
    // const exchangeSymbol = 'binance';
    const exchange = new ccxt[exchangeSymbol]();
    const ticker = await exchange.fetchOrderBook(symbol);
    console.log(`============ ticker ${symbol} =============`);
    console.log(ticker);
}

// fetchOrderBook('HPY/USDT');
// fetchOrderBook('HPY/BTC');
// fetchOrderBook('BTC/USDT');

module.exports = {
    sum,
    getChainInfo,
    fetchOrderBook,
};
