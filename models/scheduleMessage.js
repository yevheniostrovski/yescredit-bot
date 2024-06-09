// scheduleMessage.js

const { DataTypes, Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const ScheduledMessage = sequelize.define('ScheduledMessage', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'telegramId'
    }
  },
  messageTemplate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  messageKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "queque"
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

async function updateDeliveryStatus(messageId, updates) {
  try {
    const [updatedRowsCount] = await ScheduledMessage.update(updates, {
      where: {
        id: messageId,
      },
    });
    return updatedRowsCount;
  } catch (error) {
    console.error('Error updating delivery status:', error);
    throw error;
  }
}

module.exports = {
  ScheduledMessage,
  updateDeliveryStatus
};
