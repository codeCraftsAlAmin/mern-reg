# # client side of mernReg

# basic setup

- install tailwind and shadcn.ui

- create routes

- handle routing

- set up redux-toolkit

# register form

- create register slice

- hanlde regiser form

- pass user data through registerUser

- hanlde toast

- redirect user after user is successfully created

# verify user

- get otp from useSelector

- pass email through reducer when user is fullfilled

- verify user thorugh reducer

# handle resend and login route

- handle countwond timer

- format time

- mask email

- create separate slice for resend

- use registerSlice to resend verification

# handle login

- get email from register slice and take it as a initial email

- create loginSLice

- pass emill and password to userLoginData

- use toast

- navigate the user to protected route

- user checkAuth check if accss and refresh token has generated from frontend

# handle log out

- clear user data at loginSlice

- use logout url

- dispatch clearUserData

- if user logout navigate to login

- use toglle for that

# re-generate access token

- follow lib/api.js

- then handle App.jsx

# handle all users

- get all users through getAllUsers

- use debouncing to search user

- pass search value through getAllUsers

- set conditon for searching to getAllusers

- handle delete user

- handle ban/unban and isAdmin

- show success and error message

# handle pagination

- update redux slice to store page & totalPages

- update getAllUsers thunk to return pagination info

- create pagination UI

- wire up click to fetch new page

# update user

- collect user info

- check hanlde submit

- create update user slice

- submit user id and data through updateUserInfo

# update user passwod

- take user id from login reducer

- pass old, new and conf_new password

- handle error

# forgot password

- submit email to backend

- take token

- pass the token to the reset password route
