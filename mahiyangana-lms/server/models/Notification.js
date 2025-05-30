const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  dateSent: { type: Date, default: Date.now },
  receiverRole: { type: String, enum: ['Student', 'Teacher', 'All'] }
});

module.exports = mongoose.model('Notification', notificationSchema);
