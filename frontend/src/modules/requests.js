// requests.js
import axios from "axios";
// to receive notifications emitted by the server
const SERVER = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_SERVER}`;

// Route requests

// async function to post a user and email to the /users/subscribe route for the newsletter
export async function subscribeUser(subscriber) {
  const response = await axios
    .post(`${SERVER}/users/subscribe`, subscriber)
    .then((res) => res.data)
    .catch((err) => false);
  return response;
}

// async function to post an email to the /users/unsubscribe route to unsubscribe from a newsletter
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
  const { name, surname, username, email, password, currency } = register;
  const response = await axios
    .post(`${SERVER}/users/register`, {
      name,
      surname,
      username,
      email,
      password,
      currency,
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

// async function to delete user for <Account/>
export async function deleteUser(userId) {
  const response = await axios
    .post(`${SERVER}/users/deleteUser`, { userId: userId })
    .then((response) => response.data)
    .catch((err) => false);
  return response;
}

//session login/out & validation functions start here =>
// async funtion to signin if valid cookie is found
async function sessionSignin(token) {
  let user = { id: "", username: "" };
  await axios
    .post(`${SERVER}/users/sessionSignin`, {
      cookie: token,
    })
    .then((res) => {
      const { id, username } = { ...res.data };
      user = { id: id, username: username };
    });
  return user;
}

// async function to validate session
async function reqValidation(token) {
  const response = await axios
    .post(`${SERVER}/users/validatesession`, {
      cookie: token,
    })
    .catch((err) => console.log(err));
  return response;
}

// async session validation for <App/>
export async function session() {
  // log the document.cookie if needed
  // console.log(document.cookie);
  if (document.cookie && reqValidation(document.cookie.split("=")[1])) {
    const response = await sessionSignin(document.cookie.split("=")[1]);
    return response;
  } else {
    return false;
  }
}
//<- session login/out & validation functions end here
// async funtion to retrieve user details for login page
export async function userDetails(userId) {
  const user = await axios
    .post(`${SERVER}/users/details`, {
      userId: userId,
    })
    .then((res) => res.data)
    .catch((err) => false);

  return user;
}

//update user details requests start here =>
// async function to change username for <UserPanel/>
export async function postUpdateUsername(myDetails) {
  const response = await axios
    .post(`${SERVER}/users/updateusername`, myDetails)
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}

// async function to change email for <UserPanel/>
export async function postUpdateEmail(myDetails) {
  const response = await axios
    .post(`${SERVER}/users/updateemail`, myDetails)
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}

// async function to change password for <UserPanel/>
export async function postUpdatePassword(myDetails) {
  const response = await axios
    .post(`${SERVER}/users/updatepwd`, myDetails)
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}

// async function to change currency for <UserPanel/>
export async function postUpdateCurrency(myDetails) {
  const response = await axios
    .post(`${SERVER}/users/updatecurrency`, myDetails)
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}
// <- update user details requests end here

// Function to search the Bitcoin blockchain using BlockCypher API
export async function searchBitcoinBlockchain(query) {
  const baseUrl = process.env.REACT_APP_BlOCKCYPHER_BASE_URL;
  let url = "";
  // Determine if the query is likely a transaction ID or an address based on length
  if (query.length === 64) {
    // typical length of a transaction ID
    url = `${baseUrl}/txs/${query}?token=${process.env.REACT_APP_BlOCKCYPHER_API}`;
  } else {
    url = `${baseUrl}/addrs/${query}?token=${process.env.REACT_APP_BlOCKCYPHER_API}`;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error searching the Bitcoin blockchain:", error);
    return null;
  }
}

// currency conversion API query
export async function getBTCConversionRate(currency) {
  const url = `${
    process.env.REACT_APP_COINGECKO_BASE_URL
  }${currency.toLowerCase()}`;
  try {
    const response = await axios.get(url);
    return response.data.bitcoin[currency.toLowerCase()];
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return null;
  }
}

// subscribe to bitcoin address hash request start here =>
// async function to Subscribe user for changes to a specific BTC address
export async function postAddressSubscription(address, userSliceData) {
  const userData = {
    userId: userSliceData.userId,
    username: userSliceData.username,
    currency: userSliceData.currency,
  };
  const response = await axios
    .post(`${SERVER}/subscribers/btcaddress`, { address, userData })
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}
//<= subscribe to bitcoin address hash request end here

// initiate webhook request starts here ->
// * Currently the webhook is coming from the App component to ensure that the event is happening in all routes.
export async function initiateWebhook(userData) {
  const response = await axios
    .post(`${SERVER}/subscribers/webhook/initiate`, { userData })
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}
// <- initiate webhook request ends here ->
