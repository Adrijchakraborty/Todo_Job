import express from "express"
import dotenv from "dotenv"
import session from "express-session";

import { useMongodbConfig } from "./config/mogodbConfig.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import userRouter from "./routers/user.router.ts"

dotenv.config();
useMongodbConfig();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'super-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === 'production',
        },
    })
);
app.use(express.json());

app.use("/api/user", userRouter);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})