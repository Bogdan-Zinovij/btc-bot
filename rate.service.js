import axios from "axios";

const NBU_STATS_URL =
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";
const BTC_TO_USD_URL =
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

class RateService {
    async getUsdRate() {
        try {
            const response = await axios.get(BTC_TO_USD_URL);
            const data = response.data;

            if (!data.price) {
                throw new Error(
                    "Unexpected response from the 3rd party service"
                );
            }
            const rate = parseInt(data.price);
            const message = `Current BTC-rate is ${rate} USD`;

            return message;
        } catch (error) {
            throw new Error("Error fetching data: " + error.message);
        }
    }

    async getUahRate() {
        try {
            const response = await axios.get(NBU_STATS_URL);
            const data = response.data;

            // if (!data.price) {
            //     throw new Error(
            //         "Unexpected response from the 3rd party service"
            //     );
            // }
            const rate = data[0].rate;
            const message = `Current BTC-rate is ${rate} UAH`;

            return message;
        } catch (error) {
            throw new Error("Error fetching data: " + error.message);
        }
    }
}

export default new RateService();
