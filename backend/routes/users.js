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
export const usersRouter = express.Router();

dotenv.config();

/* async function to test if any of the user's data exists in encrypted form in the subscribers collections */
async function testSubscribersData(key, value) {
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

/* async function to test if any of the user's data exists in encrypted form in the users collections */
async function testUsersData(key, value) {
  const obj = { [key]: value };
  const test = await LoadFromDB("users", obj)
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
usersRouter.route("/subscribe").post(async (req, res) => {
  const { name, surname, email } = req.body;
  // encrypt data
  const encipheredName = encipher(name);
  const encipheredSurname = encipher(surname);
  const encipheredEmail = encipher(email);
  // Check to make sure submitted email is not already there
  const testEmail = await testSubscribersData("email", encipheredEmail);
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
usersRouter.route("/unsubscribe").post(async (req, res) => {
  const { email } = req.body;
  const encipheredEmail = encipher(email);
  // Check to make sure submitted email is already there
  const testEmail = await testSubscribersData("email", encipheredEmail);
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

// post from contact form to email account (mailtrap.io)
usersRouter.route("/contact").post(async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let body = req.body.body;

  //create transport for nodemailer
  const transport = nodemailer.createTransport({
    // todo change transport properties to those of the destination email before production
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // run transport

  await transport
    .sendMail({
      from: email,
      to: "joe@test.com",
      subject: subject,
      html: `<div className="">
      <h2>Here is your email!</h2>
      <p>${body}</p>
      <p>Yours Sincerely</p>
      <p>${name}</p>
      </div>`,
    })
    .then(() => {
      res.send(true);
      console.log("Received email from contact form!");
    })
    .catch((error) => {
      res.send(false);
      console.log(
        "An attempt to send an email from the contact form was made but it failed"
      );
    });
});

/*
Name and surname do not have to be unique
enforce unique user name & encrypt
 enforce unique email & encrypt
 send the user a confirm email link to finalise registration
 Upon registration notify user that he has been registered and request him to log in to his account
*/

//post to register user
usersRouter.route("/register").post(async (req, res) => {
    const { name, surname, username, email, password } = req.body;
  // Hash password
  const hashedPassword = HashString(password);
  // encrypt name, surname, username, email
  const encryptedName = encipher(name);
  const encryptedSurname = encipher(surname);
  const encryptedUsername = encipher(username);
  const encryptedEmail = encipher(email);

  /*
  test whether username and email are already registered, if not stop registration and inform registrant. Else, register
   if the username has been registered, tell the registrant
  /if the email has been registered, do not tell the registrant, but tell him only that there is a problem with the credentials to preserve the privacy of the registered email address.
  */

  const testUserName = await testUsersData("username", encryptedUsername);
  const testEmail = await testUsersData("email", encryptedEmail);
  if (testUserName && testEmail) {
    console.log("username and email already registered!");
    res.send("bothTaken");
  } else if (testUserName) {
    console.log("username already registered!");
    res.send("usernameTaken");
  } else if (testEmail) {
    console.log("Email already registered!");
    res.send("emailTaken");
  } else {
    // register user
    await SaveToDB("users", {
      name: encryptedName,
      surname: encryptedSurname,
      username: encryptedUsername,
      email: encryptedEmail,
      password: hashedPassword,
    });
    res.send("registered");
  }
});
