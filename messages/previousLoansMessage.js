// previousLoansHandler.js
const TeleBot = require('telebot');
const User = require('../models/user');

async function askPreviousLoans(msg, bot) {
    try {
        console.log('[askPreviousLoans] Callback query received:', msg.data);

        const messageTemplate = `↩️ Попередні позики:\n
Ви вже отримували раніше позику чи кредит?
Якщо так, то скільки разів?`;
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('Не отримував', {callback: 'credit_previous_0'})
            ],
            [
                bot.inlineButton('Так, 1 раз', {callback: 'credit_previous_1'})
            ],
            [
                bot.inlineButton('Так, декілька разів', {callback: 'credit_previous_more'})
            ]
        ]);
        await bot.sendMessage(msg.from.id, messageTemplate, { replyMarkup });

        const creditRating = getCreditHistoryState(msg.data);
        console.log ("[creditRating]:", creditRating);

        // Запись статуса кредита пользователя в базу данных
        await User.update({ creditStatus: creditRating }, { where: { telegramId: msg.from.id } });

    } catch {
        console.error('[askPreviousLoans] Ошибка при обработке сообщения о отказе:', error);
    }
}

// Функция для определения состояния кредитной истории на основе выбранной опции
function getCreditHistoryState(option) {
    switch (option) {
        case 'credit_history_good':
            return 'Добра';
        case 'credit_history_bad':
            return 'Погана';
        case 'credit_history_unknown':
            return 'Не знаю';
        default:
            return 'Неопределено';
    }
}

module.exports = askPreviousLoans;
