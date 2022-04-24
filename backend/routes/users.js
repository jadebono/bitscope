"use strict";

// route for all interactions with users

import dotenv from "dotenv";
import express from "express";
import { encipher, decipher } from "../encryption.js";
import * as fs from "fs";
import HashString from "../mongoConnect.js";
import {
  deleteFromDB,
  LoadFromDB,
  SaveToDB,
  updateDB,
} from "../mongoConnect.js";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import {
  signSessionToken,
  validateSessionToken,
  decryptSessionToken,
} from "../token.js";
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
  test whether username and email are already registered, if not stop registration and inform registrant. 
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

//post to signin user
usersRouter.route("/login").post(async (req, res) => {
  const { username, password } = req.body.userData;
  // encrypt username
  const encryptedUsername = encipher(username);
  // hash password
  const hashedPassword = HashString(password);
  // search collection users for someone with this username
  await LoadFromDB("users", { username: encryptedUsername })
    .then((response) => {
      // destructure and decrypt data
      const user = response[0];
      // check that user is not "undefined"
      if (!user) {
        res.send({
          login: false,
          userId: "",
          username: "",
          token: "",
        });
        // if username exists AND password matches
      } else if (
        encryptedUsername === user.username &&
        hashedPassword === user.password
      ) {
        // generate token
        const token = signSessionToken(user._id);
        res.send({
          login: true,
          userId: user._id,
          username: username,
          token: token,
        });
        console.log("Successful login!");
      }
      // if username exists but password is incorrect
      // send an empty object with login: false
      else {
        res.send({
          login: false,
          userId: "",
          username: "",
          token: "",
        });
        console.log("Invalid login!");
      }
    })
    .catch((error) => console.log(error));
});

// route to validate session
usersRouter.route("/validatesession").post((req, res) => {
  let token = req.body.cookie;
  res.send(validateSessionToken(token));
});

// route to sign in a user if session is still active
usersRouter.route("/sessionSignin").post(async (req, res) => {
  let token = req.body.cookie;
  let user = decryptSessionToken(token);
  // fetch user data
  if (user) {
    await LoadFromDB("users", { _id: { $eq: new ObjectId(user) } })
      .then((response) => {
        const loggedUser = response.pop();
        const username = decipher(loggedUser.username);
        res.send({
          id: loggedUser._id,
          username: username,
        });
        console.log("User session successfully restored");
      })
      .catch((err) => {
        res.send({
          id: "",
          username: "",
        });
        console.log("There was some error!");
      });
  } else {
    res.send({
      id: "",
      username: "",
    });
    console.log("User was not authenticated!");
  }
});

// route to close a user's account
usersRouter.route("/deleteUser").post(async (req, res) => {
  const user = req.body.userId;
  await deleteFromDB("users", { _id: { $eq: new ObjectId(user) } })
    .then(() => {
      res.send(true);
      console.log("Account successfully closed!");
    })
    .catch((err) => {
      res.send(false);
      console.log("Unknown Error! Account not closed!");
    });
});

// route to retrieve user details
usersRouter.route("/details").post(async (req, res) => {
  const user = req.body.userId;
  await LoadFromDB("users", { _id: { $eq: new ObjectId(user) } })
    .then((response) => {
      const loggedUser = response.pop();
      const name = decipher(loggedUser.name);
      const surname = decipher(loggedUser.surname);
      const username = decipher(loggedUser.username);
      const email = decipher(loggedUser.email);
      res.send({
        name: name,
        surname: surname,
        username: username,
        email: email,
      });
      console.log(`user details successfully retrieved!`);
    })
    .catch((err) => {
      res.send(false);
      console.log("An unknown problem has occurred");
    });
});

// update user details routes start here =>

// route to update username
usersRouter.route("/updateusername").post(async (req, res) => {
  const username = req.body.username;
  const userId = req.body.userId;
  console.log(username, userId);
  // encrypt username
  const encryptedUsername = encipher(username);
  // search collection users for someone with this username
  const usernameExists = await LoadFromDB("users", {
    username: encryptedUsername,
  });
  // .then((response) => decipher(response[0].username));

  console.log(usernameExists.length);
  // {
  // destructure and decrypt data
  // const username = decipher(response[0].username);
  // check that user is not "undefined"

  // if username does NOT exist, update record
  if (usernameExists.length === 0) {
    await updateDB(
      "users",
      { _id: ObjectId(userId) },
      { username: encryptedUsername }
    );
    res.send("usernameUpdated");
    console.log("username changed!");
  } else {
    res.send("usernameTaken");
    console.log("That username already exists!");
  }
});

// <- update user details routes end here
