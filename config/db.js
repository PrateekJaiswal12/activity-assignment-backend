import mongoose from "mongoose"

const connectToDb = () => {
    mongoose
    .connect(process.env.MONGO_DB_URI, {
        dbName: 'activity-booking',
    })
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((e) => {
        console.log(e)
    })
};

export default connectToDb;