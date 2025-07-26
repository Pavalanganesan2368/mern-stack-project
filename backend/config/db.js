import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();


const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGODB CONNECTED : ${conn.connection.host}`);
    } catch (err) {
        console.error('Error : ', err.message);
        process.exit(1); //1 code means exit with failure 0 code means success
    }
}

export default connectDatabase;