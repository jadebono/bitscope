"use strict";

// Imports
import cookieParser from "cookie-parser"; // * unknown if required yet
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// importing routes

// todo import routes here

// run dotenv.config()
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(cookieParser()); // * unknown if needed yet
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// todo routes
