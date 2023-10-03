"use strict";

// route for all interactions with subscribers to the subscriptions collection containing records of those who have subscribed to hashes

import dotenv from "dotenv";
import express from "express";
import { encipher, decipher } from "../encryption.js";
import HashString from "../mongoConnect.js";
import {
  deleteFromDB,
  LoadFromDB,
  SaveToDB,
  updateArrayDB,
  updateDB,
} from "../mongoConnect.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
export const subscribersRouter = express.Router();

dotenv.config();

/* async function to test if any of the user's data exists in encrypted form in the subscriptions (address and tx hashes) collection */
async function testSubscriptionData(key, value) {
  const obj = { [key]: value };
  const test = await LoadFromDB(process.env.DB_COLLECTION_SUBSCRIPTIONS, obj)
    .then((response) => {
      if (response.length) {
        const user = response[0];
        return user[key] === value ? true : false;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
  return test;
}
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

  /* Check if user already has a subscription:
  if the user is already in the subscriptions collection{
    then we simply add encryptedAddress to his address array. 
  } else {
    we create a new record for the user with his array to store his subscribed addresses
  }
  */

  // Check if user already has a subscription:
  const testUserName = await testSubscriptionData(
    "username",
    encryptedUsername
  );

  if (testUserName) {
    // check if encryptedAddress does exist in the user's record
    // !!TODO - success/error messages
    await LoadFromDB(process.env.DB_COLLECTION_SUBSCRIPTIONS, {
      username: encryptedUsername,
    }).then(async (response) => {
      const retrievedAddresses = response[0].address;
      if (retrievedAddresses.includes(encryptedAddress)) {
        res.send("You are already subscribed to: ");
        // if user exists BUT the address is not in his array
      } else if (
        testUserName &&
        !retrievedAddresses.includes(encryptedAddress)
      ) {
        updateArrayDB(
          process.env.DB_COLLECTION_SUBSCRIPTIONS,
          { username: encryptedUsername },
          "address",
          encryptedAddress
        )
          .then(() => {
            res.send("You have successfully subscribed to: ");
          })
          .catch((err) => {
            res.send("You have failed to subscribe to: ");
          });
      }
    });
  }
  // if username does not exist, add subscriberData to subscriptions collection
  if (!testUserName) {
    await SaveToDB(process.env.DB_COLLECTION_SUBSCRIPTIONS, subscriberData)
      .then(() => {
        res.send("You have successfully subscribed to: ");
      })
      .catch((err) => {
        res.send("You have failed to subscribe to: ");
      });
  }
});
