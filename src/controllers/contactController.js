const Contact = require('../models/contactModel')

exports.index = (req, res) => {
  res.render('contact', {
    contact: {}
  })
}

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.register()

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect('/contact'))

      return
    }

    req.flash('success', 'The contact has been added to your phone book.')
    req.session.save(() => res.redirect(`/contact/${contact.contact._id}`))
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.contactEdit = async (req, res) => {
  if (!req.params.id) return res.render('404')

  const contact = await Contact.searchById(req.params.id)

  if (!contact) return res.render('404')

  res.render('contact', { contact })
}
