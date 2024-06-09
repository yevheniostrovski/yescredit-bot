module.exports = (bot, msg) => {
  const replyMarkup = bot.inlineKeyboard([
    [
      bot.inlineButton('Пример 1', { callback: 'TEST_1' })
    ],
    [
      bot.inlineButton('Пример 2', { callback: 'TEST_2' })
    ]
  ]);

  const handlers = {
    'TEST_1': (callbackQuery) => { /* Обработчик для TEST_1 */ },
    'TEST_2': (callbackQuery) => { /* Обработчик для TEST_2 */ },
  };

  return {
    message: `Привет, ${msg.from.first_name}! Это тестовое сообщение.`,
    replyMarkup,
    handlers
  };
};
