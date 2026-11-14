const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./db.js");
const userRouter = require("./routes/user.router.js");
const cors = require("cors");
require("dotenv/config");

const PORT = process.env.PORT;
const app = express();

const start = async() => {
    app.use(express.json());
    
    app.use(cookieParser());

    app.use(cors({
        origin: "http://localhost:5173"
    }));
    
    await db.authenticate();
    await db.sync();

    app.use("/", userRouter);

    app.listen(PORT, () => {
        console.log("Программа запущена");
    });
}

start();