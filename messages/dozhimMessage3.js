// dozhimMessage3.js
const banks = require('../config/banks');

function dozhimMessage3(msg, bot, offersData) {
    const headTitle = `💳 VISA**** 25-05-2024 Зарахування: 18.200грн\n
Отримувач: ${msg.from.first_name}\n\n
Кошти готові до переклазу.
Переходьте на сайти нижче та залишайте заявки для отримання грошей ⬇`;

    let message = '';
    const advUrlPrefix = '👉🏻 ▶ ';
    const buttons = [];
    
    offersData.forEach((offerData, index) => {
        const offer = banks.find(bank => bank.key === offerData.key);
        if (offer) {
            message += `${index === 0 ? '' : '\n\n'}${offerData.text}\n`;
            message += `${advUrlPrefix}[${offer.website}](${offer.advUrl})`; // Добавляем ссылку в формате Markdown
        } else {
            console.error('Оффер не найден для ключа:', offerData.key);
        }
    });

    const advice = `💡Порада: Щоб збільшити ймовірність і швидкість схвалення позики, залиште анкети відразу в кількох компаніях маленькими сумами!`;

    bot.sendMessage(msg.from.id, headTitle + '\n\n' + message + '\n\n' + advice, { parseMode: 'Markdown' });
}

module.exports = dozhimMessage3;

