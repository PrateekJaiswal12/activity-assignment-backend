import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDb from './config/db.js';
import cors from 'cors';
import userRoutes from './routers/user.route.js';
import activityRoutes from './routers/activity.route.js';


const app = express();


// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// routes
app.use('/user', userRoutes);
app.use('/activity', activityRoutes);


// app listen 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectToDb()
})
