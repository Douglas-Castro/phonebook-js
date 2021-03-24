const mongoose = require('mongoose')
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor (body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async register () {
    this.validate()

    if (this.errors.length > 0) return

    try {
      this.user = await LoginModel.create(this.body)
    } catch (e) {
      console.log(e)
    }
  }

  validate () {
    this.cleanUp()

    // Email Validation
    if (!validator.isEmail(this.body.email)) this.errors.push('• Please, enter a valid email.')

    // Password Validation
    if (this.body.password.length < 5) this.errors.push('• Your password must be at least 5 characters.')
    if (this.body.password.length >= 50) this.errors.push('• Your password must be no longer than 50 characters.')
  }

  cleanUp () {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login
