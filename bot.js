const TelegramBot = require("node-telegram-bot-api");
const rateService = require("./rate.service");

const token = "6641079765:AAELgB-TnFqS-USg96ULo1ndVaVJXnBvZnc";

const bot = new TelegramBot(token, { polling: true });

const Commands = {
    USD: "/get-rate-usd",
    UAH: "/get-rate-uah",
};

bot.setMyCommands([
    {
        command: Commands.USD,
        description: "Get BTC rate in USD currency",
    },
    {
        command: Commands.UAH,
        description: "Get BTC rate in UAH currency",
    },
]);

bot.onText(Commands.USD, async (msg) => {
    try {
        const rate = await rateService.getUsdRate();
        bot.sendMessage(msg.chat.id, rate);
    } catch (error) {
        bot.sendMessage(
            msg.chat.id,
            "Помилка отримання курсу Bitcoin у доларах."
        );
    }
});

bot.onText(Commands.UAH, async (msg) => {
    try {
        const rate = await rateService.getUahRate();
        bot.sendMessage(msg.chat.id, rate);
    } catch (error) {
        bot.sendMessage(
            msg.chat.id,
            "Помилка отримання курсу Bitcoin у гривнях."
        );
    }
});
