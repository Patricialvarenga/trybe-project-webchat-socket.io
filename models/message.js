const connection = require('./connection');

const list = async () => {
  try {
    const db = await connection();
    const findAll = await db.collection('messages').find().toArray();
    return findAll;
  } catch (e) {
    console.log(e);
  }
};

 const create = async (message) => {
  try {
    const db = await connection();
    const createMessage = await db.collection('messages').insertOne(message);
    return createMessage;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  list,
 create,
};