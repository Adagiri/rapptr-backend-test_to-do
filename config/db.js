const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

mongoose.set('strictQuery', false);

mongoose.connection.on('error', (err) => {
  console.error('err', err);
});

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL);
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = connectDB;

module.exports = {
  connectDB,
  disconnectDB,
};
