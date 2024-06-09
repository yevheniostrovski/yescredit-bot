const axios = require('axios');
const banks = require('../config/banks');
const config = require('../config/variables');

async function getTopBanks() {
    try {
        const response = await axios.get(config.scoresUrl);
        const scores = response.data;

        // Сортируем банки по рейтингу из scores.cache
        const sortedBanks = [...banks].sort((a, b) => {
            const scoreA = scores[a.key] || 0;
            const scoreB = scores[b.key] || 0;
            return scoreB - scoreA; // Сортируем в порядке убывания
        });

        // Выбираем топ-8 офферов
        const topBanks = sortedBanks.slice(0, 8);

        return topBanks;
    } catch (error) {
        console.error('Ошибка при получении топ-8 офферов:', error);
        return [];
    }
}

// Список индексов офферов, которые уже были предложены пользователю
const offeredIndexes = [];

async function generateOfferHandler(msg, bot) {
    try {
        await bot.sendMessage(msg.from.id, '🔄 Виконується підбір компанії');

        // Делаем задержку перед отправкой оффера
        await new Promise(resolve => setTimeout(resolve, 2000));

        const topBanks = await getTopBanks();

        // Фильтруем офферы, чтобы исключить те, которые уже были предложены
        const availableBanks = topBanks.filter((bank, index) => !offeredIndexes.includes(index));

        // Если все офферы уже были показаны пользователю
        if (availableBanks.length === 0) {
            await bot.sendMessage(msg.from.id, 'Вибач, але це всі компанії, що ми можем порадити тобі сьогодні. Зачекай трішки і ми тобі щось надішлемо незабаром👌');
            return { offer: null, index: null };
        }

        // Выбираем случайный оффер из доступных
        const randomIndex = Math.floor(Math.random() * availableBanks.length);
        const randomOffer = availableBanks[randomIndex];

        // Добавляем индекс выбранного оффера в список уже предложенных
        const selectedIndex = topBanks.indexOf(randomOffer);
        offeredIndexes.push(selectedIndex);

        await sendOfferMessage(msg, bot, randomOffer);
    } catch (error) {
        console.error('Ошибка при генерации оффера:', error);
        return { offer: null, index: null };
    }
}


// Функция для отправки сообщения с оффером
async function sendOfferMessage(msg, bot, offer) {
    try {
        // Генерируем случайное количество звездочек от 3 до 5
        const rating = '★'.repeat(Math.floor(Math.random() * 3) + 3);

        let message = `✅ Компанія підібрана!\n\n`;
        message += `Рейтинг: ${rating}\n\n`;
        message += `💡 Сьогодні у неї середній показник схвалення заявок вищий, ніж в інших компаній.`;

        // Создаем кнопки
        const buttons = bot.inlineKeyboard([
            [
                bot.inlineButton('Отримати гроші 💸', { url: offer.advUrl }),
                bot.inlineButton('Підібрати ще', { callback: 'GENERATE_OFFER' })
            ]
        ]);

        // Отправляем сообщение с кнопками
        await bot.sendMessage(msg.from.id, message, { parseMode: 'Markdown', replyMarkup: buttons });
    } catch (error) {
        console.error('Ошибка при отправке сообщения с оффером:', error);
    }
}

module.exports = generateOfferHandler;
