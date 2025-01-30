// const mongoose = require('mongoose')
// const databaseUrl =
//   process.env.DATABASE_URL //|| 'mongodb://127.0.0.1/argentBankDB'

// module.exports = async () => {
//   try {
//     await mongoose.connect(databaseUrl, { useNewUrlParser: true })
//     console.log('Database successfully connected')
//   } catch (error) {
//     console.error(`Database Connectivity Error: ${error}`)
//     throw new Error(error)
//   }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Arnaud
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};

module.exports = dbConnection;
