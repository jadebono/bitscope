import axios from "axios";
const SERVER = "http://localhost:4000";
// Route requests

// Requests to the /newsletter routes

// async function to post user and email to /newsletter/subscribe route
export async function subscribeUser(subscriber) {
  console.log(subscriber);
  await axios
    .post(`${SERVER}/newsletter/subscribe`, subscriber)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}
