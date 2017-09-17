const Apod = require('../models/Apod')

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



module.exports = {
  create
}
