import fetch from "node-fetch";

const BTC_TO_UAH_URL =
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH";
const BTC_TO_USD_URL =
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

class RateService {
    async getUsdRate() {
        const response = await fetch(BTC_TO_USD_URL);
        const data = await response.json();

        if (!data.price) {
            throw new Error("Unexpected response from the 3rd party service");
        }
        const rate = parseInt(data.price);
        const message = `Current BTC-rate is ${rate} USD`;

        return message;
    }

    async getUahRate() {
        const response = await fetch(BTC_TO_UAH_URL);
        const data = await response.json();

        if (!data.price) {
            throw new Error("Unexpected response from the 3rd party service");
        }
        const rate = parseInt(data.price);
        const message = `Current BTC-rate is ${rate} UAH`;

        return message;
    }
}

export default new RateService();
