import axios from "axios";
const SERVER = "http://localhost:4000";
// Route requests

// Requests to the /newsletter routes

// async function to post a user and email to the /newsletter/subscribe route
export async function subscribeUser(subscriber) {
  const response = await axios
    .post(`${SERVER}/users/subscribe`, subscriber)
    .then((res) => res.data)
    .catch((err) => false);
  return response;
}

// async function to post an email to the /newsletter/unsubscribe route
export async function unsubscribeUser(email) {
  const response = await axios
    .post(`${SERVER}/users/unsubscribe`, email)
    .then((res) => res.data)
    .catch((err) => false);
  return response;
}

// async function to post the email form from contact us
export async function postContactForm(fields) {
  const response = await axios
    .post(`${SERVER}/users/contact`, fields)
    .then((response) => response.data)
    .catch((err) => false);
  return response;
}

// async function to register user for <Register/>
export async function postRegister(register) {
  const { name, surname, username, email, password } = register;
  const response = await axios
    .post(`${SERVER}/users/register`, {
      name,
      surname,
      username,
      email,
      password,
    })
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}

// async function to Login user for <Login/>
export async function postLogin(userData) {
  const response = await axios
    .post(`${SERVER}/users/login`, { userData })
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}
