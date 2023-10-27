import axios from "axios";

const NBU_STATS_URL =
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";

class RateService {
    async getUsdRate() {
        try {
            const response = await axios.get(NBU_STATS_URL);
            const dollarCurrency = response.data.find(
                (currency) => currency.cc === "USD"
            );
            const message = `Поточний курс долара USD становить ${dollarCurrency.rate} гривень`;

            return message;
        } catch (error) {
            throw new Error("Error fetching data: " + error.message);
        }
    }

    async getEurRate() {
        try {
            const response = await axios.get(NBU_STATS_URL);
            const euroCurrency = response.data.find(
                (currency) => currency.cc === "EUR"
            );
            const message = `Поточний курс євро EUR становить ${euroCurrency.rate} гривень`;

            return message;
        } catch (error) {
            throw new Error("Error fetching data: " + error.message);
        }
    }
}

export default new RateService();
