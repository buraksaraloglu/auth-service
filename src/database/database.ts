import { connect } from 'mongoose';
let dbURI = process.env.DATABASE_URL;

console.log('dbURI', dbURI);

const connectDB = async () => {
  try {
    await connect(dbURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
