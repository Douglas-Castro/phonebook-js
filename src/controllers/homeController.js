const Contact = require('../models/contactModel')

exports.index = async (req, res) => {
  try {
    const contact = new Contact()
    const contacts = await contact.searchContacts()
    res.render('index', { contacts })
  } catch (e) {
    console.log(e)
  }
}
