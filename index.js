const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')
const expressValidator = require('express-validator')
app.use(expressValidator())
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

// Set Static Assets Folder ===============

app.use(express.static('public'))

// Connect to Mongodb ================

mongoose.connect('mongodb://localhost/wdi-project-2')

// Utility Middleware =======================

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// Express Session =============

app.use(session({
  cookie: {maxAge: 60000},
  secret: 'shesellsseashells',
  resave: false,
  saveUninitialized: true

}))

// Connect Flash ===============

app.use(flash())
app.use(function (req, res, next) {
  res.locals.successMessage = req.flash('successMessage')
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// Passport ========================

app.use(passport.initialize())
app.use(passport.session())

// Express Handlebars ================

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: path.join(__dirname, '/views/layouts/')}))
app.set('view engine', 'handlebars')

// Routes =========================
const index = require('./routes/index_routes')
const users = require('./routes/users_routes')
const apod = require('./routes/apod_routes')

app.use('/', index)
app.use('/users', users)
app.use('/apod', apod)

app.set('port', (process.env.PORT || 4000))

const port = 4000

app.listen(port, function () {
  console.log('Express is running on port ' + port)
})
