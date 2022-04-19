# `Platform - Working Title`

**Author:** Christine Borg (design), Joseph Anthony Debono (code),  
**email:** [criborg@gmail.com](criborg@gmail.com), [joe@jadebono.com](joe@jadebono.com)  
**Institution**: Placeholder  
**Site:** [not available](http:localhost:3001/)  
**Date of commencement:** 3 April 2022

---

# Getting Started with Create React App

This project was bootstrapped with:

[Create React App](https://github.com/facebook/create-react-app)  
[React Redux](https://react-redux.js.org/)  
[Redux Toolkit](https://redux-toolkit.js.org/)  
[Tailwind](https://tailwindcss.com/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

---

# `Frontend`

## `Potential Name and Tagline`

Polykranos, Multidisciplinarity in an Overspecialised World

## `dependencies`

1. "@reduxjs/toolkit": "^1.8.1",
1. "@testing-library/jest-dom": "^5.16.4",
1. "@testing-library/react": "^12.1.4",
1. "@testing-library/user-event": "^13.5.0",
1. "axios": "^0.26.1",
1. "react": "^18.0.0",
1. "react-dom": "^18.0.0",
1. "react-redux": "^7.2.8",
1. "react-scripts": "5.0.0",
1. "redux": "^4.1.2",
1. "uuid": "^8.3.2",
1. "web-vitals": "^2.1.4"

## `Integrated Dependencies`

Tailwind comes integrated with this version of Create-React-App. Just add:

1. frontend/tailwind.config.js
1. frontend/src/index.css

contents of frontend/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## `Particular Components`

<Notifications/>

How many types of notifications? (perhaps: success, failure, warning)
What styling and colour for each?

so far:
success: bar: bg-green-500, notification: bg-green-100, bar css: .success
notify: bar: bg-blue-500, notification: bg-blue-100, bar css: .notify
error: bar: bg-red-500, notification: bg-red-100, bar css: .error
warning: bar: bg-orange-500, notification: bg-orange-100, bar css: .warning
anything else: white background and no bar

### `Component Properties go here`

### `Component Variables and Properties`

#### `Variables`

1. Example: vatRate variable allows operator to change the vat rate.

#### `Properties`

---

# `Backend`

Port: 4000

1. folder for middleware
1. folder for routes

**IMPORTANT**

1. Most node variables are environment variables stored in the .env file.
1. .env file in backend folder excluded from git for security

## `Cookies`

```js
// setting the session cookie
document.cookie = `session=${user.token}; max-age:${whatever} `;

//deleting the session cookie
document.cookie = `session=""; max-age=0`;
```

## `Logging requests`

## `dependencies`

1. "cookie-parser": "^1.4.6",
1. "cors": "^2.8.5",
1. "dotenv": "^16.0.0",
1. "express": "^4.17.3",
1. "jsonwebtoken": "^8.5.1",
1. "mongodb": "^4.4.0",
1. "nodemailer": "^6.7.2",
1. "nodemon": "^2.0.15",

## `External Services`

### `MongoDB`

Database: ecom
Collections: platform, subscribers

## `Useful Tutorials`

1. [React Tutorial - Beginner to Advanced - freeCodeCamp](https://youtu.be/zrs7u6bdbUw)
1. [Full React Course 2020 - Learn Fundamentals, Hooks, Context API, React Router, Custom Hooks](https://youtu.be/4UZrsTqkcW4)
1. [React Notification Component - ReactJS Tutorial](https://youtu.be/KYKmqeU6lOI)
1. [React Router 6 Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9h7F1LWaQ7MAI8ptg5VjvxJ)
1. [React Router V6 Tutorial - Routes, Redirecting, UseNavigate, UseParams...](https://youtu.be/UjHT_NKR_gU)
1. [10 React Hooks Explained // Plus Build your own from Scratch](https://youtu.be/TNhaISOUy6Q)
