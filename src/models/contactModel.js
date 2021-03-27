const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: false, default: '' },
  phone_number: { type: String, require: false, default: '' },
  created: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact {
  constructor (body) {
    this.body = body
    this.errors = []
    this.contact = null
  }

  async searchById (id) {
    try {
      this.contact = await ContactModel.findById(id)
      return this.contact
    } catch (e) {
      console.log(e)
    }
  }

  async register () {
    try {
      this.validate()
      if (this.errors.length > 0) return

      this.contact = await ContactModel.create(this.body)
    } catch (e) {
      console.log(e)
    }
  }

  validate () {
    this.cleanUp()

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('• Invalid Email.')
    if (!this.body.name) this.errors.push('• Please, contact name needs to be put.')
    if (!this.body.email && !this.body.phone_number) this.errors.push('• Please, enter at least one contact information: e-mail or phone number.')
  }

  cleanUp () {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      phone_number: this.body.phone_number
    }
  }

  async edit (id) {
    try {
      this.validate()
      if (this.errors.length > 0) return

      this.contact = await ContactModel.findOneAndUpdate(id, this.body, { new: true })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Contact
