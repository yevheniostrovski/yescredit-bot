// userPhoneMessage.js
const TeleBot = require('telebot');
const fs = require('fs');
const path = require('path');
const askCreditOverdue = require('../messages/creditOverdueMessage');
const User = require('../models/user'); // Импортируем модель User

function askUserPhone(msg, bot) {
    console.log('Callback query received:', msg.data);

    const messageTemplate = `📱 Ваш номер мобільного телефону:\n
Введіть номер вашого мобільного телефону у форматі +380XXXXXXXXX`;

    bot.sendMessage(msg.from.id, messageTemplate);

    // Добавляем обработчик для текстовых сообщений от пользователя
    async function phoneInputHandler(inputMsg) {
        const phoneNumber = inputMsg.text.trim();
        // Проверяем, соответствует ли введенный текст формату номера телефона
        const phonePattern = /^\+380\d{9}$/;
        if (phonePattern.test(phoneNumber)) {
            // Номер введен корректно, сохраняем его в файл
            const filePath = path.join(__dirname, '..', './data/phones');
            fs.appendFile(filePath, `${phoneNumber}\n`, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении номера телефона в файл:', err);
                } else {
                    console.log('Номер телефона успешно сохранен в файл.');
                }
            });

            try {
                // Сохраняем номер телефона в базу данных
                const user = await User.findOne({ where: { telegramId: inputMsg.from.id } });
                if (user) {
                    user.phoneNumber = phoneNumber;
                    await user.save();
                    console.log('Номер телефона успешно сохранен в базу данных.');
                } else {
                    console.error('Пользователь не найден в базе данных.');
                }
            } catch (error) {
                console.error('Ошибка при сохранении номера телефона в базу данных:', error);
            }

            // Отправляем следующее сообщение
            askCreditOverdue(inputMsg, bot);

            // Удаляем обработчик текстовых сообщений
            bot.removeEvent('text', phoneInputHandler);
        } else {
            // Номер введен некорректно, просим пользователя ввести номер заново
            bot.sendMessage(inputMsg.from.id, 'Будь-ласка, введіть номер телефону у форматі +380XXXXXXXXX');
        }
    }

    bot.on('text', phoneInputHandler);
}

module.exports = askUserPhone;