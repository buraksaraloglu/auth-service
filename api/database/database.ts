import logger from '@/utils/logger';
import { connect } from 'mongoose';
let dbURI = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await connect(dbURI);
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
