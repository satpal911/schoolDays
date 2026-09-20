import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import  connectDb from './database/db.js';
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

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