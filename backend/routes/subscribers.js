"use strict";

// route for all interactions with users

import dotenv from "dotenv";
import express from "express";
import { encipher, decipher } from "../encryption.js";
import * as fs from "fs";
import HashString from "../mongoConnect.js";
import { deleteFromDB, LoadFromDB, SaveToDB } from "../mongoConnect.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
export const subscribersRouter = express.Router();

dotenv.config();

// async function to test if any of the user's data exists in encrypted form in the db
async function testData(key, value) {
  const obj = { [key]: value };
  const test = await LoadFromDB("subscribers", obj)
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

// post route to subscribe a user to the newsletter
subscribersRouter.route("/subscribe").post(async (req, res) => {
  const { name, surname, email } = req.body;
  // encrypt data
  const encipheredName = encipher(name);
  const encipheredSurname = encipher(surname);
  const encipheredEmail = encipher(email);
  // Check to make sure submitted email is not already there
  const testEmail = await testData("email", encipheredEmail);
  // if email does not exist, add user to list of subscribers
  if (testEmail) {
    res.send("Email is already subscribed!");
    console.log("Email is already subscribed!");
  } else {
    await SaveToDB("subscribers", {
      name: encipheredName,
      surname: encipheredSurname,
      email: encipheredEmail,
    })
      .then(() => {
        res.send(true);
        console.log("Subscription succeeded!");
      })
      .catch((err) => {
        res.send(false);
        console.log("Subscription Failed");
      });
  }
});

// post route to delete a user from the newsletter
subscribersRouter.route("/unsubscribe").post(async (req, res) => {
  const { email } = req.body;
  const encipheredEmail = encipher(email);
  // Check to make sure submitted email is already there
  const testEmail = await testData("email", encipheredEmail);
  // if email exists delete user's record
  if (testEmail) {
    // delete record
    await deleteFromDB("subscribers", { email: encipheredEmail })
      .then(() => {
        res.send(true);
        console.log("Email successfully unsubscribed");
      })
      .catch((err) => {
        res.send(false);
        console.log("Attempt to unsubscribe has failed!");
      });
  } else {
    res.send("That email is not subscribed!");
    console.log("That email is not subscribed!");
  }
});
