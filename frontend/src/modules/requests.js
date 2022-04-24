import axios from "axios";
const SERVER = "http://localhost:4000";
// Route requests

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
  console.log(document.cookie);
  if (document.cookie && reqValidation(document.cookie.split("=")[1])) {
    const response = await sessionSignin(document.cookie.split("=")[1]);
    return response;
  } else {
    return false;
  }
}

//<- session login/out & validation functions end here
