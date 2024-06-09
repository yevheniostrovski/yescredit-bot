// userService.js

const { addScheduledMessage } = require('../handlers/messageScheduler');
const { approveCreditMessage, dozhimMessage1, dozhimMessage2, dozhimMessage3, dozhimMessage4, dozhimMessage5 } = require('../handlers/messageTemplates');

// Функция для задания времени через определенное количество дней в конкретное время
function setDayAt(offsetDays, hours, minutes) {
  const now = new Date();
  const nextDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + offsetDays,
    hours || 0,
    minutes || 0,
    0
  );
  return nextDay;
}

// Воронка отправки сообщений

async function subscribeUserToScheduler(bot, msg, userId) {
  try {
    const now = new Date();

    // Сообщение через 30 минут "Вы получили кредит?"
    const msgTime_1 = new Date(now.getTime() + 30 * 60 * 1000);
    await addScheduledMessage(userId, 'T0', "отримали кредит?", msgTime_1, approveCreditMessage, [bot, msg, userId]);

    // Через 2 часа "Заявка схвалена" 120 * 60 * 1000
    const msgTime_2 = new Date(now.getTime() + 120 * 60 * 1000);
    await addScheduledMessage(userId, 'T1', "selfie", msgTime_2, dozhimMessage1, [bot, msg, "selfiecredit"]);

    // Через 1 день утро в 10:00 
    const msgTime_3 = setDayAt(1, 10, 0);
    const offersData_1 = [
        { key: 'slon', text: '(ТОП) Схвалення 99,4%!' },
        { key: 'selfiecredit', text: 'З будь-якої історією, без перевірок та відсотків:' },
        { key: 'firstcredit', text: 'З простроченнями та безробітним:' },
        { key: 'avans', text: '(НОВИЙ) До 20.000 грн - безкоштовно:' }
    ];
    await addScheduledMessage(userId, 'T2', "slon, selfie, first, avans", msgTime_3, dozhimMessage2, [msg, bot, offersData_1]);

    // Через 1 день Вечер 19:00
    const msgTime_4 = setDayAt(1, 19, 0);
    const offersData_2 = [
        { key: 'selfiecredit', text: '(ТОП) Схвалення 99,1%!' },
        { key: 'credit7', text: 'З простроченнями та безробітним:' },
        { key: 'creditplus', text: 'З будь-якої кредитною історією:' },
        { key: 'starfin', text: '(НОВИЙ) До 20.000 грн - безкоштовно:' }
    ];
    await addScheduledMessage(userId, 'T3', "selfie, creditplus, credit7, starfin", msgTime_4, dozhimMessage3, [bot, msg, offersData_2]);

    // Через 1 день Вечер 19:30 "Вы получили кредит?"
    const msgTime_5 = setDayAt(1, 19, 30);
    await addScheduledMessage(userId, 'T0', "отримали кредит?", msgTime_5, approveCreditMessage, [bot, msg, userId]);

    // Через 2 дня в 9:30
    const msgTime_6 = setDayAt(2, 9, 30);
    await addScheduledMessage(userId, 'T4', "mycredit", msgTime_6, dozhimMessage4, [msg, bot, "mycredit"]);

    // Через 2 дня в 10:00 "Вы получили кредит?"
    const msgTime_7 = setDayAt(2, 10, 0);
    await addScheduledMessage(userId, 'T0', "отримали кредит?", msgTime_7, approveCreditMessage, [bot, msg, userId]);

    // Через 4 дня в 12:00
    const msgTime_8 = setDayAt(4, 12, 0);
    const offersData_3 = [
        { key: 'creditplus', text: '(ТОП) Схвалення 99,8%!' },
        { key: 'moneyveo', text: 'З будь-якої історією, без перевірок та відсотків:' },
        { key: 'finbar', text: 'З простроченнями та безробітним:' },
        { key: 'finsfera', text: '(НОВИЙ) До 14.000 грн - безкоштовно:' }
    ];
    await addScheduledMessage(userId, 'T2', "creditplus, moneyveo, finbar, finsfera", msgTime_8, dozhimMessage2, [msg, bot, offersData_3]);

    // Через 4 дня в 12:30 "Вы получили кредит?"
    const msgTime_9 = setDayAt(4, 12, 30);
    await addScheduledMessage(userId, 'T0', "отримали кредит?", msgTime_9, approveCreditMessage, [bot, msg, userId]);

    // Через 5 дней в 14:00
    const msgTime_10 = setDayAt(5, 14, 0);
    await addScheduledMessage(userId, 'T4', "avans", msgTime_10, dozhimMessage4, [msg, bot, "avans"]);

    // Через 7 дней в 20:00
    const msgTime_11 = setDayAt(7, 20, 0);
    const offersData_4 = [
        { key: 'slon', text: '(ТОП) Схвалення 99,2%!' },
        { key: 'creditplus', text: 'З будь-якої історією, без перевірок та відсотків:' },
        { key: 'credit7', text: 'З простроченнями та безробітним:' },
        { key: 'starfin', text: '(НОВИЙ) До 20.000 грн - безкоштовно:' }
    ];
    await addScheduledMessage(userId, 'T2', "slon, creditplus, credit7, starfin", msgTime_11, dozhimMessage2, [msg, bot, offersData_4]);

    // Через 7 дня в 20:30 "Вы получили кредит?"
    const msgTime_12 = setDayAt(7, 20, 30);
    await addScheduledMessage(userId, 'T0', "отримали кредит?", msgTime_12, approveCreditMessage, [bot, msg, userId]);

    // Через 8 дней в 12:00
    const msgTime_13 = setDayAt(8, 12, 0);
    await addScheduledMessage(userId, 'T5', "miloan", msgTime_13, dozhimMessage5, [msg, bot, "miloan"]);
    

    console.log(`[subscribeUserToScheduler] User ${userId} added to the message scheduler successfully.`);
  } catch (error) {
    console.error('****Ошибка при добавлении пользователя в планировщик:', error);
    throw error;
  }
}

module.exports = {
  subscribeUserToScheduler
};
