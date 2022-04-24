/*
Legend
* notes
! warnings
? For consideration
todo things to be done
*/

/*
* Opening phase: Week starting 3rd April  (1)
current todos
// todo make the navbar responsive
// todo  one account link on Navbar instead of Sign in/out 
// todo a register link on Navbar DONE
// ? use .env file for frontend environmental variables? - no
// todo create git repository
// todo make Subscribe component responsive
// todo start backend 
// todo create new db in cluster0 
// todo create subscribers collection in new db  
//  emails are to be stored as jsonwebtoken consisting of the email and the key so that if the db is hacked the emails will be unreadable. STATUS: FAILED. JST tokens are not deterministic and can be independently read. Find a real encryption method. ENCRYPTION METHOD FOUND.

* responsive means to make mobile friendly
* db is database

* Opening phase: Week starting 10 April  (2)
current todos
// todo add encryption functions to encrypt and decrypt all user data
// todo add facility to test whether subscriber's email is already in db 
// todo encrypt user's name and surname in the db too
// todo add unsubscribe route
// todo rebuild structure with redux toolkit
// todo app to test color scheme


* Opening phase: Week starting 17 April  (3)
current todos
// todo add footer
// todo create a header component
// todo find out how to use above to deliver notifications upon req/res etc
// todo add notify to app page and test there
// todo add response to subscribe page
// todo add response to contact us page and get it to work properly
// todo use react-router
// todo add frontend notification to un/successful un/subscription
// todo make notifications change bar colour according to message
// todo convert notifications to use redux-toolkit
// todo add home page and subscribe page and create the links with react-router
// todo started contact page
// todo an error page/404-not found
// todo register page (enforce a complicated password policy)
// todo redux loses state when routing to a new link. Find out why and resolve.
// todo login page
// todo cookie with max-age
// todo validate cookie and auto login if cookie is still valid
// todo add different colours to the text of the notification for contrast
// todo users route takes you to Login page if you are not logged in, to Account page if you are
// todo start Account page 
// todo add logout button to Account page



* Opening phase: Week starting 24 April  (4)

? should I add functionality to have more than one notification display simultaneously?
// ? should I move the user icon to be visible on a mobile page? - yes. Resolved
// todo refreshing loses state that the user is logged in. Find issue and resolve it (problem was with the expression of some of the conditions)
todo userSess state in App not clearing after user clears. Why not?
// todo add left-hand user details panel to Account page
// todo add edit details button to Account page (username/email/password)
todo add right-hand edit <Updateusername/> panel to Account page when user clicks edit username button
todo add right-hand edit <Updateemail/> panel to Account page when user clicks edit username button
todo add right-hand edit <Updatepassword/> panel to Account page when user clicks edit username button
todo add email confirmation for password update to Account page
todo Add 2FA for logging in  
todo add email confirmation for registration
todo learn how to use Redux Thunk for async requests with axios in Slices
todo about page  
todo check if Christine wants gradient or solid colour on navbar/footer
todo colour scheme
todo typography scheme
todo create a separate app to write emails and send them to the addresses stored in db
todo deploy frontend as a mobile app => this will require react native







*/
