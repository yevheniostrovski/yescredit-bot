const User = require('./user');
const ScheduledMessage = require('./scheduleMessage');

User.hasMany(ScheduledMessage, { foreignKey: 'userId' });
ScheduledMessage.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  ScheduledMessage
};
