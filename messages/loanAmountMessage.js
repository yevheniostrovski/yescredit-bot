// loanAmountHandler.js
const TeleBot = require('telebot');

function askLoanAmount(msg, bot) {
    console.log('Команда отримана:', msg.data);

    const messageTemplate = `💰 Сума позики:\n\nСкільки грошей ви хочете отримати?`;
    
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('До 5.000 грн', {callback: 'loan_amount_5000'})
        ],
        [
            bot.inlineButton('Від 5.000 до 15.000', {callback: 'loan_amount_10000'}),
        ],
        [
            bot.inlineButton('Більше 15.0000 грн', {callback: 'loan_amount_50000'})
        ]
    ]);
    bot.sendMessage(msg.from.id, messageTemplate, { replyMarkup });
}

module.exports = askLoanAmount;
