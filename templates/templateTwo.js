// templateTwo.js
const TeleBot = require('telebot');

function templateTwo(bot, msg) {
    const messageTemplate = "Это шаблон сообщения номер 2.";

    bot.sendMessage(msg.chat.id, messageTemplate)
        .then(() => {
            console.log(`Сообщение "${messageTemplate}" успешно отправлено`);
        })
        .catch(error => {
            console.error('Ошибка отправки сообщения:', error);
        });
}

module.exports = templateTwo;
