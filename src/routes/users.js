const express = require('express')
const routes = express.Router()

const SessionController = require('../app/constrollers/SessionController')
const UserController = require('../app/constrollers/UserController')

//login/logout

//routes.get('/login', SessionController.loginForm)
//routes.post('/login', SessionController.login)
//routes.post('/logout', SessionController.logout)

//reset passoword / forgot
//routes.get('/forgot-passowrd', SessionController.forgotForm)
//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/forgot-passowrd', SessionController.forgot)
//routes.post('/password-reset', SessionController.reset)

//user register UserController

routes.get('/register', UserController.registerForm)
//routes.post('/register', UserController.post)

//routes.get('/', UserController.show)
//routes.put('/', UserController.show)
//routes.delet('/', UserController.show) //

module.exports = routes