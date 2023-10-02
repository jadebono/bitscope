"use strict";

// route for all interactions with subscribers to the newsletter

import dotenv from "dotenv";
import express from "express";
import { encipher, decipher } from "../encryption.js";
import * as fs from "fs";
import HashString from "../mongoConnect.js";
import { deleteFromDB, LoadFromDB, SaveToDB } from "../mongoConnect.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
export const subscribersRouter = express.Router();

dotenv.config();

// post route to subscribe a user to a BTC address hash
subscribersRouter.route("/btcaddress").post(async (req, res) => {
  const { address, userData } = req.body;
  const { userId, username, currency } = userData;

  // Encrypt required fields
  const encryptedUsername = encipher(username);
  const encryptedCurrency = encipher(currency);
  const encryptedAddress = encipher(address);
  // Prepare data object to save to database
  const subscriberData = {
    _id: ObjectId(userId),
    username: encryptedUsername,
    currency: encryptedCurrency,
    address: [encryptedAddress], // Store as an array to allow for multiple addresses per user
  };

  /* Check if user is already subscribed to the given address:
  
  if the user is already in the subscriptions collection{
    then we simply add encryptedAddress to his address array. 
  } else {
    we create a new record for the user with his array to store his subscribed addresses
  }


  */

  // Save to database
  await SaveToDB("subscriptions", subscriberData);
  // check if successful else check the error and send it back
  res.send("Subscription successful");
});
