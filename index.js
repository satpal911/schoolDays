import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import  connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 5000;

// Import routes
import studentRouter from './routes/student.routes.js';
import adminRouter from './routes/admin.routes.js';
import directorRouter from './routes/director.routes.js';


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/director', directorRouter);
connectDb()
.then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        }); 
    } catch (error) {
        console.error('Error starting the server:', error);
    }
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
})

