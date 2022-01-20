const Message = require('../models/message');

module.exports = async (req, res) => {
  const messages = await Message.list();

  return res.render('index', { messages });
};