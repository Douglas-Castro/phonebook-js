const User = require('../models/userModel')

exports.index = (req, res) => {
  if (req.session.user) return res.render('logged-in')
  res.render('login')
}

exports.register = async function (req, res) {
  try {
    const user = new User(req.body)
    await user.register()

    if (user.errors.length > 0) {
      req.flash('errors', user.errors)
      req.session.save(function () {
        return res.redirect('/login')
      })

      return
    }

    req.flash('success', 'Your account was created.')
    req.session.save(function () {
      return res.redirect('/login')
    })
  } catch (e) {
    console.log(e)

    return res.render('404')
  }
}

exports.login = async function (req, res) {
  try {
    const user = new User(req.body)
    await user.login()

    if (user.errors.length > 0) {
      req.flash('errors', user.errors)
      req.session.save(function () {
        return res.redirect('/login')
      })

      return
    }

    req.flash('success', 'YAY! You are logged in.')
    req.session.user = user.user

    req.session.save(function () {
      return res.redirect('/login')
    })
  } catch (e) {
    console.log(e)

    return res.render('404')
  }
}

exports.logout = function (req, res) {
  req.session.destroy()
  res.redirect('/')
}
