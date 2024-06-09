// creditHistoryHandler.js
const TeleBot = require('telebot');

function askCreditHistory(msg, bot) {
        console.log('[askCreditHistory] Callback query received:', msg.data);

        const messageTemplate = `Чи знаєте ви, яка у вас кредитна історія?\n\n(Кредитна історія може бути поганою, якщо раніше у вас були відмови у видачі або прострочення вже виданих позик)`;
        
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('Добра', {callback: 'credit_history_good'})
            ],
            [
                bot.inlineButton('Погана', {callback: 'credit_history_bad'})
            ],
            [
                bot.inlineButton('Не знаю', {callback: 'credit_history_unknown'})
            ]
        ]);
        bot.sendMessage(msg.from.id, messageTemplate, { replyMarkup });

        
}

module.exports = askCreditHistory;
