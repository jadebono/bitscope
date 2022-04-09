"use strict";

// route for all interactions with users

import dotenv from "dotenv";
import express from "express";
import * as fs from "fs";
import HashString from "../mongoConnect.js";
import { incLog, LoadFromDB, SaveToDB } from "../mongoConnect.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
export const subscribersRouter = express.Router();

dotenv.config();

// function to encrypt subcriber's email with jwt
function encryptEmail(email) {
  return jwt.sign({ data: email }, process.env.SECRET_KEY);
}

//function to decrypt subscriber's email with jwt
function decryptEmail(token) {
  try {
    // token.data will contain the decrypted email
    return jwt.verify(token, process.env.SECRET_KEY).data;
  } catch (error) {
    return "Error! Decryption of email failed!";
  }
}

// post route to subscribe a user to the newsletter

subscribersRouter.route("/subscribe").post(async (req, res) => {
  const { name, surname, email } = req.body;
  // encrypt email using jwt
  const token = encryptEmail(email);
  //add user to list of subscribers
  // add checking feature to make sure that the submitted email is not already there
  await SaveToDB("subscribers", {
    name: name,
    surname: surname,
    email: token,
  })
    .then(res.send("Subscription succeeded!"))
    .catch((err) => console.log(err));
});
