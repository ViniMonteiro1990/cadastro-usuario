const express = require('express')
const routes = express.Router()

const SessionController = require('../app/constrollers/SessionController')
const UserController = require('../app/constrollers/UserController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const {isLoggedRedirectToUsers, onlyUsers} = require ('../app/middlewares/session')
//login/logout

routes.get('/login', isLoggedRedirectToUsers ,SessionController.loginForm)
routes.post('/login',SessionValidator.login ,SessionController.login)
routes.post('/logout', SessionController.logout)

//reset passoword / forgot
routes.get('/forgot-password', SessionController.forgotForm)
//routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot ,SessionController.forgot)
//routes.post('/password-reset', SessionController.reset)

//user register UserController

routes.get('/register', UserController.registerForm)
routes.post('/register',UserValidator.post ,UserController.post)

routes.get('/', onlyUsers ,UserValidator.show ,UserController.show)
routes.put('/',UserValidator.update ,UserController.update)
//routes.delet('/', UserController.show) //

module.exports = routes