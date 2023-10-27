import TelegramBot from "node-telegram-bot-api";
import RateService from "./rate.service.js";

const token = "6641079765:AAELgB-TnFqS-USg96ULo1ndVaVJXnBvZnc";

const bot = new TelegramBot(token, { polling: true });

const COMMANDS = [
    {
        command: "/get_rate_usd",
        description: "Get BTC rate in USD currency.",
    },
    {
        command: "/get_rate_uah",
        description: "Get BTC rate in UAH currency.",
    },
];

bot.setMyCommands(COMMANDS);

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Привіт, обери команду та дізнайся курс BTC");
});

bot.onText(/\/get_rate_usd/, async (msg) => {
    try {
        const rate = await RateService.getUsdRate();
        console.log(rate);
        bot.sendMessage(msg.chat.id, rate);
    } catch (error) {
        bot.sendMessage(msg.chat.id, error.message);
    }
});

bot.onText(/\/get_rate_uah/, async (msg) => {
    try {
        const rate = await RateService.getUahRate();
        bot.sendMessage(msg.chat.id, rate);
    } catch (error) {
        bot.sendMessage(msg.chat.id, "Error");
    }
});
