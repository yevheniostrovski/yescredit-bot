// dozhimMessage4.js
const banks = require('../config/banks');

function dozhimMessage4(msg, bot, key) {
    const offer = banks.find(bank => bank.key === key);
    if (offer) {
        const message = `😎 ${msg.from.first_name} , 14 567 грн. - це твоя позика! 😎
Ти потрапив у 1000 осіб, яким видамо позику прямо сьогодні!
Займи до 15 тисяч і витратити куди потрібно 😎

Натисніть на посилання і заповнюй анкету:`;
        const buttons = bot.inlineKeyboard([
            [
                bot.inlineButton('Отримати гроші', { url: offer.advUrl })
            ]
        ]);
        bot.sendMessage(msg.from.id, message, { replyMarkup: buttons });
    } else {
        console.error('Оффер не найден для ключа:', key);
    }
}

module.exports = dozhimMessage4;
