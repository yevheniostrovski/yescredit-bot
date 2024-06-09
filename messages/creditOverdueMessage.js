// creditOverdueMessage.js
const TeleBot = require('telebot');

function askCreditOverdue(msg, bot) {
    const messageTemplate = `🚫 Прострочення:\n
На даний момент у вас є відкриті прострочення за кредитами чи позиками? Якщо так, то скільки?`;

    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('Ні, не було', {callback: 'overdue_0'}),
        ],
        [
            bot.inlineButton('Так, 1 прострочка', {callback: 'overdue_1'}),
        ],
        [
            bot.inlineButton('Так, декілька', {callback: 'overdue_more_1'}),
        ]
    ]);

    bot.sendMessage(msg.from.id, messageTemplate, { replyMarkup });
}

module.exports = askCreditOverdue;
