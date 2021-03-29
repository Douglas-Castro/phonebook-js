const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true }
})

const UserModel = mongoose.model('User', UserSchema)

class User {
  constructor (body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async login () {
    try {
      if (this.errors.length > 0) return

      this.user = await UserModel.findOne({ email: this.body.email })

      if (!this.user) {
        this.errors.push('• User doesn\'t exist.')

        return
      }

      if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
        this.errors.push('• Incorrect password.')
        this.user = null
      }
    } catch (e) {
      console.log(e)
    }
  }

  async register () {
    try {
      this.validate()
      if (this.errors.length > 0) return

      await this.userExists()

      if (this.errors.length > 0) return

      const salt = bcryptjs.genSaltSync()
      this.body.password = bcryptjs.hashSync(this.body.password, salt)

      this.user = await UserModel.create(this.body)
    } catch (e) {
      console.log(e)
    }
  }

  async userExists () {
    try {
      this.user = await UserModel.findOne({ email: this.body.email })
      if (this.user) this.errors.push('• User already exists.')
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

module.exports = User
