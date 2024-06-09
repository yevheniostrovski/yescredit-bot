// index.js
require('dotenv').config();
const TeleBot = require('telebot');
const { Sequelize } = require('sequelize');
const path = require('path');

// Модели
const User = require('./models/user');
const { ScheduledMessage } = require('./models/scheduleMessage');

const { scheduleMessages } = require('./handlers/messageScheduler');
const { subscribeUserToScheduler } = require('./handlers/userService');
const getOffers = require('./handlers/getOffersHandler');

const startHandler = require('./messages/startMessage');
const askLoanAmount = require('./messages/loanAmountMessage');
const askCreditHistory = require('./messages/creditHistoryMessage');
const askPreviousLoans = require('./messages/previousLoansMessage');
const askUserPhone = require('./messages/userPhoneMessage');
const askFakeApprove = require('./messages/fakeApproveMessage');

const bot = new TeleBot(process.env.TELEGRAM_TOKEN);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
    console.log('\x1b[32mУспешное подключение к базе данных\x1b[0m');
  })
  .catch((error) => {
    console.error('****Ошибка подключения к базе данных:', error);
  });

let isFirstStart = true;
console.log("Флаг isFirstStart", isFirstStart);

bot.on('/start', async (msg) => {
  try {
    // Не трогать
    if (isFirstStart) {
      const [user, created] = await User.findOrCreate({
        where: { telegramId: msg.from.id },
        defaults: { 
          telegramId: msg.from.id,
          username: msg.from.username,
          firstName: msg.from.first_name,
          lastName: msg.from.last_name
        }
      });

      startHandler(bot, msg);
      await subscribeUserToScheduler(bot, msg, msg.from.id);
    }
  } catch (error) {
    console.error('****Ошибка при работе с базой данных:', error);
  }
});


// Создаем словарь для маршрутизации
const handlers = {
    'get_loan': askLoanAmount,
    'loan_amount_5000': askCreditHistory,
    'loan_amount_10000': askCreditHistory,
    'loan_amount_50000': askCreditHistory,
    'credit_history_good': askPreviousLoans,
    'credit_history_bad': askPreviousLoans,
    'credit_history_unknown': askPreviousLoans,
    'credit_previous_0': askUserPhone,
    'credit_previous_1': askUserPhone,
    'credit_previous_more': askUserPhone,
    'overdue_0': askFakeApprove,
    'overdue_1': askFakeApprove,
    'overdue_more_1': askFakeApprove,
    'show_more_companies': (msg) => {
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        getOffers(msg, bot);
    },
};
// Обработчик для всех остальных callbackQuery
bot.on('callbackQuery', (msg) => {
  const handler = handlers[msg.data];
  if (handler) {
    handler(msg, bot);
  } else {
    console.log('****Нет обработчика для данного типа callbackQuery:', msg.data);
  }
});

bot.start((msg) => {});