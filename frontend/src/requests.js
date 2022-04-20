import axios from "axios";
const SERVER = "http://localhost:4000";
// Route requests

// Requests to the /newsletter routes

// async function to post a user and email to the /newsletter/subscribe route
export async function subscribeUser(subscriber) {
  const response = await axios
    .post(`${SERVER}/newsletter/subscribe`, subscriber)
    .then((res) => res.data)
    .catch((err) => false);
  return response;
}

// async function to post an email to the /newsletter/unsubscribe route
export async function unsubscribeUser(email) {
  const response = await axios
    .post(`${SERVER}/newsletter/unsubscribe`, email)
    .then((res) => res.data)
    .catch((err) => false);
  return response;
}
