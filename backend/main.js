// main.js
"use strict";

// !!TODO send notifications from webhooks to the frontend

// Imports
import cookieParser from "cookie-parser"; // to parse cookies send from the frontend if needed
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ConnectMDB, CloseMDB } from "./mongoConnect.js";
import http from "http";
import { createSubscribersRouter } from "./routes/subscribers.js";

// importing routes
import { usersRouter } from "./routes/users.js";

// run dotenv.config()
dotenv.config();

const app = express();
// Create an HTTP server instance
const httpServer = http.createServer(app);

// creating the subscribersRouters using createSubscribersRouter with the httpserver as the paramter
const subscribersRouter = createSubscribersRouter(httpServer);

// middleware
app.use(cors({ origin: `${process.env.HOST}3000` }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/users", usersRouter);
app.use("/subscribers", subscribersRouter);

// connect to db at server start
ConnectMDB();

// close connection on "exit" and "uncaughtException"
process.on("exit", () => CloseMDB());
process.on("uncaughtException", (error) => {
  console.log(error);
  CloseMDB();
});

// listen for connections using httpServer instead of app.listen because I need an httpServer instance instance for Socket.IO
httpServer.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.HOST}${process.env.PORT}`);
});

export { httpServer }; // Export the httpServer instance
