// handlers/messageScheduler.js

const fs = require('fs').promises;
const path = require('path');
const { ScheduledMessage, updateDeliveryStatus } = require('../models/scheduleMessage');
const User = require('../models/user');
const schedule = require('node-schedule');


// Добавляем запланированное сообщение в базу данных
async function addScheduledMessage(userId, messageTeplate, messageKey, scheduledTime, messageHandler, handlerArgs = []) {
  console.log(`[addScheduledMessage] Start adding scheduled message for userId: ${userId}, messageKey: ${messageKey}, scheduledTime: ${scheduledTime}`);

  try {
    const scheduledMessage = await ScheduledMessage.create({
      userId: userId,
      messageTemplate: messageTeplate,
      messageKey: messageKey,
      scheduledAt: scheduledTime,
      status: "queue"
    });

    schedule.scheduleJob(scheduledTime, async function() {

      // Проверяем статус сообщения
      if (scheduledMessage.status === 'delivered') {
        console.log(`[addScheduledMessage] Message with key ${messageKey} has already been delivered. Skipping...`);
        return;
      }

      // Вызываем наши сообщения и их отправку
      await messageHandler(...handlerArgs);

      // После успешной отправки сообщения обновляем его статус на "delivered"
      await updateDeliveryStatus(scheduledMessage.id, { status: 'delivered' });

      console.log(`[addScheduledMessage] Status was updated on "delivered"`);
    });

    console.log(`[addScheduledMessage] Message with key ${messageKey} scheduled at ${scheduledTime}`);
    return scheduledMessage;
  } catch (error) {
    console.error(`[addScheduledMessage] Error while adding scheduled message:`, error);
    throw error;
  }
}

// Планировщик сообщений
async function scheduleMessages() {
  console.log('[scheduleMessages] Start scheduling messages for all users.');
  try {
    // Получаем всех пользователей из базы данных
    const users = await User.findAll();
    console.log(`[scheduleMessages] Found ${users.length} users in the database.`);

    for (const user of users) {
      const userId = user.telegramId;
      console.log(`[scheduleMessages] Scheduling message for user: ${userId}`);
    }

    console.log('[scheduleMessages] Finished scheduling messages for all users.');

    // После завершения планирования сообщений, вызываем функцию отправки запланированных сообщений
    sendScheduledMessages();

  } catch (error) {
    console.error('[scheduleMessages] Error while scheduling messages:', error);
    throw error;
  }
}

module.exports = {
  scheduleMessages,
  addScheduledMessage
};
