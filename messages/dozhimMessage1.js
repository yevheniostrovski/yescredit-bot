// dozhimMessage1.js
const banks = require('../config/banks');

function dozhimMessage1(msg, bot, key) {
    const offer = banks.find(bank => bank.key === key);
    if (offer) {
        const message = `✅ Заявка №607460 схвалена\nСума до зарахування: до 20 000 грн\n\nБіжи за своїми грошима!⬇`;
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

module.exports = dozhimMessage1;
