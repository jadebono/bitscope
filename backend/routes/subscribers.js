// subscribers.js
"use strict";

// route for all interactions with subscribers to the subscriptions collection containing records of those who have subscribed to hashes

import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { encipher, decipher } from "../encryption.js";
import { LoadFromDB, SaveToDB, updateArrayDB } from "../mongoConnect.js";
import { ObjectId } from "mongodb";

dotenv.config();

/*Exporting a function named createSubscribersRouter, which takes httpServer as an argument. The purpose of this function is to create and return an Express Router instance configured for managing subscriber-related routes. */
export function createSubscribersRouter(httpServer) {
  const subscribersRouter = express.Router();
  const socket = new Server(httpServer);

  // array of interesting events to monitor for webhook
  const events = [
    // "unconfirmed-tx",
    "new-block",
    "confirmed-tx",
    "tx-confirmation",
    // "double-spend-tx",
    // "tx-confidence",
  ];

  // the webhook to query the blockcypher api for any changes to an address:
  async function setupWebhook(address, callbackUrl, eventType) {
    try {
      // Prepare the data object
      const data = {
        event: eventType,
        address: address,
        url: callbackUrl,
        token: process.env.BLOCKCYPHER_TOKEN,
      };

      // Now make the POST request with axios
      const response = await axios.post(
        `${process.env.BLOCKCYPHER_URL}/hooks?token=${process.env.BLOCKCYPHER_TOKEN}`,
        data // Send the object directly, not stringified
      );

      if (response.status !== 200) {
        console.error("Unexpected status code:", response.status);
        return;
      }
      // Logging successful webhook setup though not response because the response is too voluminous
      console.log("Webhook setup successful");
    } catch (error) {
      console.error(
        "Error setting up webhook:",
        error.response ? error.response.data : error.message
      );
    }
  }

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
    // Check if user already has a subscription:
    const testUserName = await testSubscriptionData(
      "username",
      encryptedUsername
    );

    if (testUserName) {
      // check if encryptedAddress does exist in the user's record
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

  // calling the webhook:
  subscribersRouter.route("/webhook/initiate").post(async (req, res) => {
    const userData = req.body;
    // when the user data is received, check if the user has subscriptions
    // if so, return a list of the addresses he has subcribed to the request
    const userId = userData.userData.userId;
    await LoadFromDB(process.env.DB_COLLECTION_SUBSCRIPTIONS, {
      _id: { $eq: new ObjectId(userId) },
    }).then(async (response) => {
      // if the first item of the response array contains data (is not falsy) and the array addresses does not have length 0 (falsy), then log the addresses
      if (response[0] && response[0].address) {
        const addresses = response[0].address;
        const decryptedArray = [];
        addresses.forEach((item) => {
          decryptedArray.push(decipher(item));
        });
        // logging the array of decrypted addresses
        console.log(decryptedArray);
        /*
      Now create webhooks for each address for each event
      */
        for (let address of decryptedArray) {
          // each event from the events array
          for (let event of events) {
            try {
              await setupWebhook(
                address,
                `${process.env.LOCALTUNNEL}:${process.env.PORT}/subscribers/webhook/notification`,
                event
              );
              console.log(
                `webhook ${event} set up for ${address}. Expecting callbacks.`
              );
            } catch (error) {
              console.error(
                "Failed to set up webhook for address",
                address,
                "and event",
                event,
                ":",
                error.message
              );
            }
          }
        }
      } else {
        console.log("No addresses found");
      }
    });
  });

  // callback route for webhook:
  subscribersRouter.route("/webhook/notification").post(async (req, res) => {
    const eventData = req.body; // The event data from BlockCypher will be in the request body
    // !! Need to receive a callback from the webhook to see what data it contains and then to forward it to the frontend
    // !! callbacks not received, using example from blockcypher documentation:  https://www.blockcypher.com/dev/?javascript#using-webhooks
    // Do something with the event data
    console.log("Received webhook notification:", eventData);
    // TODO send eventData to frontend to generate a notification
    const event = eventData[0].event;
    // send eventData[0].event to frontend
    // Notify the frontend using WebSocket
    socket.emit("new-notification", event);
    res.sendStatus(200); // Send a 200 OK response to acknowledge receipt of the notification
  });

  // test route to test that localtunnel is running. Use it in a browser or with curl: http://localhost:4000/subscribers/test
  subscribersRouter.get("/test", (req, res) => {
    res.send("The tunnel is working!\n");
  });

  return subscribersRouter;
}
