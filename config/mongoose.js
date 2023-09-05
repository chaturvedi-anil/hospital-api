import mongoose from 'mongoose';

// Replace 'your_connection_string_here' with your actual MongoDB connection string
const uri = 'mongodb://localhost:27017/hospital-api-db';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

export default db;