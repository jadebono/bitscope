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
    // !! return an error message properly formatted for username/email problems
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
  console.log(myDetails);
  const response = await axios
    .post(`${SERVER}/users/updatecurrency`, myDetails)
    .then((response) => response.data)
    .catch((err) => err);
  return response;
}

// <- update user details requests end here
