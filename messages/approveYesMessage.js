// approveYesMessage.js
const generateOfferHandler = require('../handlers/generateOfferHandler');
const User = require('../models/user');

async function approveYesMessage(callbackQuery, bot) {
    try {
        const userId = callbackQuery.from.id;

        const messageTemplate = `Дякую за користуваяння нашим сервiсом пiдбору позик!.

Якщо вам потрібно ще додаткова сума, рекомендуємо скористуватися автопідбором компаній.
Більше грошей – більше можливостей! ↓`;

        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('Підібрати компанію ✅', { callback: 'GENERATE_COMPANY' })
            ]
        ]);
        await bot.sendMessage(userId, messageTemplate, { replyMarkup });

        // Запись статуса кредита пользователя в базу данных
        await User.update({ creditStatus: 'Одобрили' }, { where: { telegramId: userId } });

        const handlers = {
            'GENERATE_COMPANY': generateOfferHandler,
        };

        // Обработчик для всех остальных callbackQuery
        bot.on('callbackQuery', async (msg) => {
            const handler = handlers[msg.data];
            if (handler) {
                await handler(msg, bot);
            } else {
                console.log('Нет обработчика для данного типа callbackQuery:', msg.data);
            }
        });
    } catch (error) {
        console.error('Ошибка при обработке сообщения о отказе:', error);
    }
}

module.exports = approveYesMessage;