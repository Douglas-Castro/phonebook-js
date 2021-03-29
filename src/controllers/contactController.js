const Contact = require('../models/contactModel')

exports.index = function (req, res) {
  res.render('contact', {
    contact: {}
  })
}

exports.register = async function (req, res) {
  try {
    const contact = new Contact(req.body)
    await contact.register()

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors)

      req.session.save(function () {
        return res.redirect('/contact')
      })
    }

    req.flash('success', 'The contact has been added to your phone book.')
    req.session.save(function () {
      return res.redirect(`/contact/${contact.contact._id}`)
    })
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.contact = async function (req, res) {
  try {
    if (!req.params.id) return res.render('404')

    let contact = new Contact()
    contact = await contact.searchById(req.params.id)

    res.render('contact', { contact })
  } catch (e) {
    console.log(e)
  }
}

exports.edit = async function (req, res) {
  try {
    const contact = new Contact(req.body)
    await contact.edit(req.params.id)

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect(`/contact/${req.params.id}`))

      return
    }

    req.flash('success', 'The contact edit has been saved.')
    req.session.save(() => res.redirect(`/contact/${req.params.id}`))
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.render('404')

    const contact = new Contact()
    await contact.delete(req.params.id)

    if (!contact) return res.render('404')

    req.flash('success', 'Contact was deleted.')
    req.session.save(() => res.redirect('back'))

    return
  } catch (e) {
    console.log(e)
  }
}
