require('dotenv').config()
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const expressValidator = require('express-validator')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/wdi-project-2'

// Set Static Assets Folder ===============

app.use(express.static('public'))

// Connect to Mongodb ================

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)

// Utility Middleware =======================

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(cookieParser())
app.use(methodOverride('_method'))

// Express Session =============

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
  // cookie: { secure: true }
}))

// Passport ========================

app.use(passport.initialize())
app.use(passport.session())

// Connect Flash ===============

app.use(flash())
app.use(function (req, res, next) {
  res.locals.successMessage = req.flash('successMessage')
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// Express Handlebars ================

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: path.join(__dirname, '/views/layouts/')}))
app.set('view engine', 'handlebars')

// Local variables ====================

app.locals = {
  APOD_API_KEY: process.env.APOD_API_KEY
}

// Routes =========================
const index = require('./routes/index_routes')
const users = require('./routes/users_routes')
const apods = require('./routes/apods_routes')

app.use('/', index)
app.use('/users', users)
app.use('/', apods)

app.set('port', (process.env.PORT || 4000))

const port = 4000

app.listen(port, function () {
  console.log('Express is running on port ' + port)
})
