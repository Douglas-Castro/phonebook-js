import 'core-js/stable'
import 'regenerator-runtime/runtime'

import ValidateFrontend from './modules/ValidateFrontend'

const validateRegister = new ValidateFrontend('.register-form')
const validateLogin = new ValidateFrontend('.login-form')
validateRegister.init()
validateLogin.init()
