const express = require('express')
const route = express.Router()

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController')
const registerController = require('./src/controllers/registerController')

const { loginRequired } = require('./src/middlewares/middleware')

// Home route
route.get('/', homeController.index)

// Register routes
route.get('/register', registerController.index)
route.post('/register/signup', registerController.register)

// Login routes
route.get('/login', loginController.index)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Contact routes
route.get('/contact', loginRequired, contactController.index)
route.post('/contact/register', loginRequired, contactController.register)
route.get('/contact/:id', loginRequired, contactController.contactEdit)

module.exports = route
