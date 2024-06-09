// approveNoMessage.js
const generateOfferHandler = require('../handlers/generateOfferHandler');
const User = require('../models/User');

async function approveNoMessage(callbackQuery, bot) {
    try {
        const userId = callbackQuery.from.id;

        const messageTemplate = `Не впадай у відчай! Іноді таке трапляється.

Якщо вам відмовили в одній організації, надішліть заявку до іншої.
Компанії між собою не пов'язані. Більше заявок – більше шансів на схвалення!

Бажаєте, я підберу вам нову компанію?`;

        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('Підібрати компанію ✅', { callback: 'GENERATE_COMPANY' })
            ]
        ]);
        await bot.sendMessage(userId, messageTemplate, { replyMarkup });

        // Запись статуса кредита пользователя в базу данных
        await User.update({ creditStatus: 'Отказали' }, { where: { telegramId: userId } });

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

module.exports = approveNoMessage;
