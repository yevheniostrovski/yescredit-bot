const TeleBot = require('telebot');
const banks = require('../config/banks');

const approveYesMessage = require('../messages/approveYesMessage');
const approveNoMessage = require('../messages/approveNoMessage');
const approveProgressMessage = require('../messages/approveProgressMessage');

function approveCreditMessage(bot, msg, userId) {
  const messageTemplate = `${ msg.from.first_name }, ви отримали кошти?`;
  const replyMarkup = bot.inlineKeyboard([
    [
      bot.inlineButton('Так, дякую', { callback: 'APPROVE_YES' })
    ],
    [
      bot.inlineButton('В процесі', { callback: 'APPROVE_PROGRESS' })
    ],
    [
      bot.inlineButton('Ні, мені відмовили', { callback: 'APPROVE_NO' })
    ]
  ]);

  bot.sendMessage(userId, messageTemplate, { replyMarkup });

  const handlers = {
    'APPROVE_YES': approveYesMessage,
    'APPROVE_NO': approveNoMessage,
    'APPROVE_PROGRESS': approveProgressMessage
  };

  // Обработчик для всех остальных callbackQuery
  bot.on('callbackQuery', (callbackQuery) => {
    const handler = handlers[callbackQuery.data];
    if (handler) {
      handler(callbackQuery, bot);
    } else {
      console.log('Нет обработчика для данного типа callbackQuery:', callbackQuery.data);
    }
  });
}

// dozhimMessage1.js
function dozhimMessage1(bot, msg, key) {
    const offer = banks.find(bank => bank.key === key);
    if (offer) {
        const message = `✅ Заявка №607460 схвалена\nСума до зарахування: до 20 000 грн\n\nБіжи за своїми грошима!⬇`;
        const buttons = bot.inlineKeyboard([
            [
                bot.inlineButton('Отримати гроші', { url: offer.advUrl })
            ]
        ]);
        bot.sendMessage(msg.from.id, message, { replyMarkup: buttons });
    } else {
        console.error('Оффер не найден для ключа:', key);
    }
}

function dozhimMessage2(msg, bot, offersData) {
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

// dozhimMessage3.js
function dozhimMessage3(bot, msg, offersData) {
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

// dozhimMessage4.js
function dozhimMessage4(msg, bot, key) {
    const offer = banks.find(bank => bank.key === key);
    if (offer) {
        const message = `😎 ${ msg.from.first_name } , 14 567 грн. - це твоя позика! 😎
Ти потрапив у 1000 осіб, яким видамо позику прямо сьогодні!
Займи до 15 тисяч і витратити куди потрібно 😎

Натисніть на посилання і заповнюй анкету:`;
        const buttons = bot.inlineKeyboard([
            [
                bot.inlineButton('Отримати гроші', { url: offer.advUrl })
            ]
        ]);
        bot.sendMessage(msg.from.id, message, { replyMarkup: buttons });
    } else {
        console.error('Оффер не найден для ключа:', key);
    }
}

// dozhimMessage5.js
function dozhimMessage5(msg, bot, key) {
    const offer = banks.find(bank => bank.key === key);
    if (offer) {
        const message = `Доброго дня, ${ msg.from.first_name }!
У Вас є поточні заборгованості?
Вже ось-ось підходить термін віддавати кошти?
Беріть в нас 10.000₴ для погашення Ваших заборгованостей.

Ми надаємо позику без довідки про доходи, потрібен тільки паспорт та код.`;
        const buttons = bot.inlineKeyboard([
            [
                bot.inlineButton('Отримати гроші', { url: offer.advUrl })
            ]
        ]);
        bot.sendMessage(msg.from.id, message, { replyMarkup: buttons });
    } else {
        console.error('Оффер не найден для ключа:', key);
    }
}

module.exports = {
  approveCreditMessage,
  dozhimMessage1,
  dozhimMessage2,
  dozhimMessage3,
  dozhimMessage4,
  dozhimMessage5
};