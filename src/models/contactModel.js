const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: false, default: '' },
  phone_number: { type: String, require: false, default: '' },
  created: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema)

function Contact (body) {
  this.body = body
  this.errors = []
  this.contact = null
}

Contact.searchById = async function (id) {
  if (typeof id !== 'string') return

  const contact = await ContactModel.findById(id)

  return contact
}

Contact.prototype.register = async function () {
  this.validate()

  if (this.errors.length > 0) return

  this.contact = await ContactModel.create(this.body)
}

Contact.prototype.validate = function () {
  this.cleanUp()

  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('• Invalid Email.')
  if (!this.body.name) this.errors.push('• Please, contact name needs to be put.')
  if (!this.body.email && !this.body.phone_number) this.errors.push('• Please, enter at least one contact information: e-mail or phone number.')
}

Contact.prototype.cleanUp = function () {
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

module.exports = Contact
