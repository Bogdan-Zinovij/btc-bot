import TelegramBot from "node-telegram-bot-api";
import RateService from "./rate.service.js";

const token = "6641079765:AAELgB-TnFqS-USg96ULo1ndVaVJXnBvZnc";

const bot = new TelegramBot(token, { polling: true });

const COMMANDS = [
    {
        command: "/get_eur_rate",
        description: "Дізнатися поточний курс євро",
    },
    {
        command: "/get_usd_rate",
        description: "Дізнатися поточний курс долара",
    },
];

bot.setMyCommands(COMMANDS);

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        "Привіт, обери команду та дізнайся курс долара чи євро"
    );
});

bot.onText(/\/get_usd_rate/, async (msg) => {
    try {
        const rate = await RateService.getUsdRate();
        bot.sendMessage(msg.chat.id, rate);
    } catch (error) {
        bot.sendMessage(msg.chat.id, error.message);
    }
});

bot.onText(/\/get_eur_rate/, async (msg) => {
    try {
        const rate = await RateService.getEurRate();
        bot.sendMessage(msg.chat.id, rate);
    } catch (error) {
        bot.sendMessage(msg.chat.id, "Error");
    }
});
