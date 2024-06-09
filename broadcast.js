// Функция для отправки сообщения всем пользователям
async function sendBroadcastMessage(bot, message) {
  try {
    // Получаем всех пользователей из базы данных
    const users = await User.findAll();
    console.log(`[sendBroadcastMessage] Found ${users.length} users.`);

    for (const user of users) {
      const chatId = user.telegramId;
      try {
        await bot.sendMessage(chatId, message);
        console.log(`[sendBroadcastMessage] Message sent to user ${chatId}`);
      } catch (error) {
        console.error(`[sendBroadcastMessage] Failed to send message to user ${chatId}:`, error);
      }
    }

    console.log('[sendBroadcastMessage] Finished sending messages.');
  } catch (error) {
    console.error('[sendBroadcastMessage] Error while sending messages:', error);
  }
}

// Пример использования функции
const broadcastMessage = 'Это тестовое сообщение для всех подписчиков!';

// Обработка команды "/broadcast"
bot.on('/broadcast', async (msg) => {
  if (msg.from.id === 286521708) {  // Замените YOUR_ADMIN_ID на ваш Telegram ID
    await sendBroadcastMessage(bot, broadcastMessage);
    bot.sendMessage(msg.from.id, 'Рассылка начата.');
  } else {
    bot.sendMessage(msg.from.id, 'У вас нет прав для выполнения этой команды.');
  }
});