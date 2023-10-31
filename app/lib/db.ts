import { DBURI } from '@/utils/constants';
import mongoose from 'mongoose';

const connection: any = {}

const connectDB = async () => {
    if (connection.isConnected) return
    const db = await mongoose.connect(DBURI)
    connection.isConnected = db.connection.readyState === 1
}
export default connectDB
