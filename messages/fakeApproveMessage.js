// fakeApprove.js
const TeleBot = require('telebot');
const getOffers = require('../handlers/getOffersHandler');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fakeApprove(msg, bot) {
    try {
        // Отправляем сообщение о том, что данные приняты и обрабатываются
        await bot.sendMessage(msg.from.id, '⏳ Дані прийняті та обробляються...');

        // Ждем 2.5 секунды перед отправкой следующего сообщения
        await delay(2500);

        // Отправляем сообщение с кредитным рейтингом
        await bot.sendMessage(msg.from.id, `👤 ${ msg.from.first_name }, ваш кредитний рейтинг складає: 594 з 1000 балів`);

        // Ждем 2.5 секунды перед отправкой следующего сообщения
        await delay(2500);

        // Отправляем сообщение о том, что компании подобраны
        await bot.sendMessage(msg.from.id, '✅ Компаніi підібранi!');

        // Ждем 2.5 секунды перед вызовом функции getOffers
        await delay(2500);

        // Вызываем функцию getOffers
        getOffers(msg, bot);

    } catch (error) {
        console.error('Ошибка во время отправки сообщений:', error);
    }
}

module.exports = fakeApprove;
