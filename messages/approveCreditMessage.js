const approveYesMessage = require('./approveYesMessage');
const approveNoMessage = require('./approveNoMessage');
const approveProgressMessage = require('./approveProgressMessage');

function approveCreditMessage(bot, userId, userFirstName) {
  const messageTemplate = `${userFirstName}, ви отримали кошти?`;
  const replyMarkup = bot.inlineKeyboard([
    [
      bot.inlineButton('Так, дякую', {callback: 'APPROVE_YES'})
    ],
    [
      bot.inlineButton('В процесі', {callback: 'APPROVE_PROGRESS'})
    ],
    [
      bot.inlineButton('Ні, мені відмовили', {callback: 'APPROVE_NO'})
    ]
  ]);

  bot.sendMessage(userId, `👤 ${userFirstName}, ви отримали кошти?`, { replyMarkup });

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

module.exports = approveCreditMessage;
