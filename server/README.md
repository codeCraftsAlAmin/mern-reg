# # server side of mernReg

# setup MVC

- mvc setup: index > app > routes > controller > service
- err and succ response: helper
- create user model at models
- create env and config
- create seed data

# get user, register user and delete user

- get user by id
- get all users
- delete user
- process register

# upload image to db

- create file at config: file.js (to handle file size and direction)
- create file at middleware: user.upload.js (to upload file using multer)
- imprort uploadUserImage at user.router
- back to process-register

# verify user

# upload image to cloudinary

- npm i cloudinary
- follow cloudinary officail doc
- store cloud_name, api_key and api_secret in .env
- import them to config: config.js
- set configueration of cloudinary in cloudinary.js
- go to middleware: user.upload.js
- back to verify at controllers

# delete user

# delete image from cloudinary

- create file at helper: cloudinaryHelper.js
- back to controller

# work with nodemailer at process register

# handle node mailer

- npm i nodemailer
- follow docs at nodemailer npm: docs
- generate smtp pass by using this url : [https://security.google.com/settings/security/apppasswords]
- create emailData at controllers
- configure smtp_username & smtp_password
- create file at helper: setEmailData.js
- create file at helper: user.email.js
- optional: pass emailData to setEmailData then pass emailData to emailWithNodeMaiiler

# resend verification

- find user by email
- check if user is verified
- re-create v-code and v-expires
- save new v-code and v-expires

# upadat user by id

- use image middleware at updateUser route
- take user id from params
- find user is exist or not
- create a update option
- take user update info from req.body
- update user image if image is selected for update

# express validation

- install express validation
- create express validation at validators: auth.js
- run express validation to runValidation.js
- use validation at router as a middleware

# update password

- create a find user by id function at helper: user.find.js
- verify old pass, new pas and confirm new pass
- set new password

# forget password

- take user email
- use exp-validator for email
- check if user exists or not
- generate jwt token
- send a mail to user

# reset password

- take token and new password
- veify jwt token
- reset password
- replace db pass with new one

# ban-unban

- take user id and action
- set condition for ban-unban
- create option
- update action

# user login

- take email and pass
- check if user exists or not
- check password
- check isBanned
- create access token at helper: user.token.js
- create refresh token at helper: user.token.js

# user log out

- clear cookie of acess and refresh token

# re-generate access token

- take old refresh token form cookies
- veify token
- create new access token

# # To check if a function returns promise or not - console.log(decoded instanceof Promise)

# # if the function returns promise then console will return true otherwise false

# handle protected route

- take access token and access key
- check is it verified
- set up login validation

# user authentication middleware

- create file at middleware: user.authentication.js
- get access token
- handle isLoggedIn, isLoggedOut, isAdmin
- user them at login route and user route
  "# mernRegBackend"
