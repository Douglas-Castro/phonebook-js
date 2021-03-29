import validator from 'validator'

export default class ValidateFrontend {
  constructor (formClass) {
    this.form = document.querySelector(formClass)
  }

  init () {
    this.events()
  }

  events () {
    if (!this.form) return
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      this.validate(e)
    })
  }

  validate (e) {
    const element = e.target
    const emailInput = element.querySelector('input[name="email"]')
    const passwordInput = element.querySelector('input[name="password"]')

    let error = false

    if (!validator.isEmail(emailInput.value)) {
      alert('• Please, enter a valid email.')
      error = true
    }
    if (passwordInput.value.length < 5) {
      alert('• Your password must be at least 5 characters.')
      error = true
    }
    if (passwordInput.value.length > 50) {
      alert('• Your password must be no longer than 50 characters.')
      error = true
    }

    if (!error) element.submit()
  }
}
