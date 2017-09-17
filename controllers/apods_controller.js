const Apod = require('../models/Apod')

function index (req, res) {
  Apod.find({
    'user': req.user._id
  })
  .populate('users')
  .exec(function (err, apods) {
    if (err) {
      console.log(err)
      return
    }
    // console.log(apods)
    res.render('apods/index', {
      allApods: apods
    })
  })
}

function show (req, res) {
  Apod.findById(
    req.params.id
  )
  .populate('user')
  .exec(function (err, apod) {
    if (err) {
      console.log(err)
    } else {
      res.render('apods/show', {
        apod: apod
      })
    }
  })
}

function create (req, res) {
  var newApod = new Apod({
    title: req.body.title,
    date: req.body.date,
    image: req.body.image,
    description: req.body.description,
    user: req.user._id
  })

  newApod.save(function (err, newApod) {
    if (err) return res.send(err)

    res.send({
      status: 'ok',
      message: 'New apod saved'
    })
  })
}

function edit (req, res) {
  Apod.findById(req.params.id, function (err, editApod) {
    if (err) {
      console.log(err)
    } else {
      res.render('./apods/edit', {
        apod: editApod
      })
    }
  })
}

function update (req, res) {
  Apod.findByIdAndUpdate(req.params.id, {title: req.body.editApodTitle, description: req.body.editApodDescription}, {new: true}, function (err, updatedApod) {
    if (err) {
      console.log(err)
    } else {
      res.render('./apods/show', {
        apod: updatedApod
      })
    }
  })
}

function destroy (req, res) {
  Apod.findByIdAndRemove(
    req.params.id, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/apods')
      }
    })
}

module.exports = {
  index,
  show,
  create,
  edit,
  update,
  destroy
}
