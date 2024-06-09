// dozhimMessage2.js
const banks = require('../config/banks');

function dozhimMessage2(msg, bot, offersData) {
    console.log('[dozhimMessage2]', msg);
    console.log('[dozhimMessage2]', msg.from.id);
    const headTitle = `Вам схвалено позику в 8 500,00 грн. на 14 днів, підпишіть договір!`;

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

module.exports = dozhimMessage2;

