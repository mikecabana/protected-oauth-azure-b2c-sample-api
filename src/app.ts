import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || 4000;
const IS_PROD = process.env.NODE_ENV === "production";

const app = express();

import accountRouter from "./routes/account.js";
import todoRouter from "./routes/todo.js";
import b2cRouter from "./routes/b2c.js";
import passport from "passport";
import { passportAzureAdBearerStrategy } from "./utils/passport-azure-ad-bearer-strategy.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(IS_PROD ? "combined" : "dev"));
app.use(helmet());
app.use(cors());

app.use(passport.initialize());

passport.use(passportAzureAdBearerStrategy);

app.get("/ping", async (req, res) => {
    res.status(200).send("pong");
});

app.use("/account", accountRouter);
app.use("/todo", todoRouter);
app.use("/b2c", b2cRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});
