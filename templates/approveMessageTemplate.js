module.exports = (bot, msg) => {
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

  const handlers = {
    'APPROVE_YES': (callbackQuery) => { /* Обработчик для APPROVE_YES */ },
    'APPROVE_PROGRESS': (callbackQuery) => { /* Обработчик для APPROVE_PROGRESS */ },
    'APPROVE_NO': (callbackQuery) => { /* Обработчик для APPROVE_NO */ },
  };

  return {
    message: `👤 ${msg.from.first_name}, ви отримали кошти?`,
    replyMarkup,
    handlers
  };
};
