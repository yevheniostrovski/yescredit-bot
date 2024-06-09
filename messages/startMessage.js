const TeleBot = require('telebot');

//  Обработчик для команды старт
function handleStart(bot, msg) {
    console.log('Команда /start была нажата');
    const welcomeMessage = `Вітаю! ✋🏼
Я Бот по підбору позик.

Допоможу тобі отримати до 100.000 грн на найкращих умовах! 💰

Для підбору компаній, з максимальною ймовірністю схвалення, дайте відповідь на кілька питань.

🔰 Важливо: Відповідайте чесно, опитування повністю анонімне, а свідомо неправдиві відповіді можуть стати причиною відмови у видачі позики.`;

    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('Отримати', {callback: 'get_loan'})
        ]
    ]);

    bot.sendMessage(msg.chat.id, welcomeMessage, { replyMarkup });
}

module.exports = handleStart;
