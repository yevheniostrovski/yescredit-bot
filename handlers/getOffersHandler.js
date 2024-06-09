// getOffers.js
const axios = require('axios');
const banks = require('../config/banks');
const config = require('../config/variables');

// Хранение индексов для каждого пользователя
const userIndexes = {};

// URL файла scores.cache на вашем сайте
const scoresUrl = config.scoresUrl;

async function getOffers(msg, bot) {

    // Инициализируем индекс для нового пользователя
    if (!userIndexes[msg.from.id]) {
        userIndexes[msg.from.id] = 0;
    }

    // Загружаем и обрабатываем данные из URL
    let scores = {};
    try {
        const response = await axios.get(scoresUrl);
        scores = response.data;
    } catch (error) {
        console.error('Ошибка при загрузке данных из scores.cache:', error);
    }

    // Сортируем банки в соответствии с данными из scores.cache
    const sortedBanks = [...banks].sort((a, b) => {
        const scoreA = scores[a.key] || 0;
        const scoreB = scores[b.key] || 0;
        return scoreA - scoreB; // Сортируем в порядке возростания
    });

    // Функция отправки офферов
    function sendOffersBatch(index) {
        // Устанавливаем лимит для отправки за один раз
        const limit = 4;
        let sentCount = 0;

        function sendNextOffer() {
            // Если достигли конца списка офферов или лимита
            if (index >= sortedBanks.length || sentCount >= limit) {
                if (sentCount >= limit && index < sortedBanks.length) {
                    sendShowMoreButton(msg.from.id);
                }
                // Обновляем индекс пользователя
                userIndexes[msg.from.id] = index;
                return;
            }

            // Создаем сообщение для текущего оффера
            let message = `*${sortedBanks[index].title}*\n\n`;
            message += `💰 До ${sortedBanks[index].sum} грн.\n`;
            message += `🔰 Рейтинг схвалення: ${sortedBanks[index].rating}%\n`;
            message += `👨 Вік: ${sortedBanks[index].ageFrom}-${sortedBanks[index].ageTo}\n`;

            // Создаем кнопку "Отримати гроші"
            const button = bot.inlineButton('Отримати гроші', { url: banks[index].advUrl });

            // Отправляем текущее изображение оффера
            bot.sendPhoto(msg.from.id, sortedBanks[index].image, { caption: message, parseMode: 'Markdown', replyMarkup: bot.inlineKeyboard([[button]]) }).then(() => {
                sentCount++;
                index++;
                setTimeout(sendNextOffer, 1000);
            }).catch((error) => {
                console.error('Ошибка при отправке изображения:', error);
                // Продолжаем отправку следующего оффера в случае ошибки
                index++;
                setTimeout(sendNextOffer, 1000);
            });
        }

        // Начинаем отправку офферов
        sendNextOffer();
    }

    // Функция для отправки кнопки "Показати ще компанії"
    function sendShowMoreButton(chatId) {
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('Показати ще компанії', { callback: 'show_more_companies' })
            ]
        ]);
        bot.sendMessage(chatId, '❓Надати ще більше компаній?', { replyMarkup });
    }

    // Начинаем отправку офферов с текущего индекса пользователя
    const currentIndex = userIndexes[msg.from.id];
    sendOffersBatch(currentIndex);
}

module.exports = getOffers;