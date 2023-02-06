import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import session from "express-session";

import { authRouter } from "./routes/authRoute";
import { userRoute } from "./routes/userRoute";

dotenv.config();

const app: Express = express();
app.use(express.json());
declare module 'express-session'{
    interface SessionData {
        _id: { [key: string]: any } | null;
        username: string | null
    }
}
app.use(session({
    secret: process.env.URI,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

app.use('/', authRouter);
app.use('/user', userRoute);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI, () => {
    console.log(`Connected to database!`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});
