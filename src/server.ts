import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from 'cors';

import { authRouter } from "./routes/authRoute";
import { userRouter } from "./routes/userRoute";
import { paymentsRouter } from "./routes/paymentsRoute";

dotenv.config();

const app: Express = express();

var options: cors.CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(express.json());
app.use(cors(options));
declare module 'express-session'{
    interface SessionData {
        _id: String | Object | null;
        username: string | null
    }
}

var oneHour = 60 * 60 * 1000;

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: oneHour },
}));

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/payments', paymentsRouter);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI, () => {
    console.log(`Connected to database!`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});
