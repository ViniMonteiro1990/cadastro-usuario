const express = require('express')
const routes = express.Router()

const SessionController = require('../app/constrollers/SessionController')
const UserController = require('../app/constrollers/UserController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
//login/logout

routes.get('/login', SessionController.loginForm)
routes.post('/login',SessionValidator.login ,SessionController.login)
routes.post('/logout', SessionController.logout)

//reset passoword / forgot
//routes.get('/forgot-passowrd', SessionController.forgotForm)
//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/forgot-passowrd', SessionController.forgot)
//routes.post('/password-reset', SessionController.reset)

//user register UserController

routes.get('/register', UserController.registerForm)
routes.post('/register',UserValidator.post ,UserController.post)

routes.get('/', UserValidator.show ,UserController.show)
routes.put('/',UserValidator.update ,UserController.update)
//routes.delet('/', UserController.show) //

module.exports = routes