// approveNoMessage.js
const generateOfferHandler = require('../handlers/generateOfferHandler');
const User = require('../models/User'); // Предполагается, что есть модель User для работы с базой данных

async function approveProgressMessage(callbackQuery, bot) {
    try {
        const userId = callbackQuery.from.id;

        const messageTemplate = `Бажаємо вам якнайшвидше отримати ваші гроші :)

Якщо вам все ж таки відмовлять у видачі або виникнуть інші складності, натисніть на кнопку нижче, і я підберу іншу компанію ↓`;

        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('Підібрати компанію ✅', { callback: 'GENERATE_COMPANY' })
            ]
        ]);
        await bot.sendMessage(userId, messageTemplate, { replyMarkup });

        // Запись статуса кредита пользователя в базу данных
        await User.update({ creditStatus: 'В процесе заявки' }, { where: { telegramId: userId } });

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

module.exports = approveProgressMessage;
