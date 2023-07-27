// dependency
const path = require('path')
const express = require('express')
const ejs = require('ejs')

const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

//import middlewares
const errorHandler = require('./middlewares/error.js')

// load config DB
const connectDB = require('./config/db')

//load environement variables
dotenv.config({ path: './config/config.env' })

//Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')
const users = require('./routes/users')
const collects = require('./routes/collects')
const messages = require('./routes/message')
const certificats = require('./routes/certificats')
const wastes = require('./routes/wastes')
const productCategories = require('./routes/productCategories.js')
const products = require('./routes/products.js')
const services = require('./routes/services.js')
const plasticTypes = require('./routes/plasticTypes')
const recyclableProductCategories = require('./routes/recyclableProductCategories.js')
const recyclableProducts = require('./routes/recyclableProducts.js')

const collectPoints = require('./routes/collectPoints')
const voluntaryDropPoints = require('./routes/voluntaryDropPoint.js')
const garbageTypes = require('./routes/garbageType.js')
const nutriScores = require('./routes/nutriScore.js')
const novaScores = require('./routes/novaScore.js')
const ecoScores = require('./routes/ecoScore.js')
const origines = require('./routes/origines.js')
const customers = require('./routes/customer.js')
const contacts = require('./routes/contacts.js')
const additives = require('./routes/additive.js')

// initialize express  application
const app = express()
app.set('view engine', 'ejs')
// Body parser
app.use(express.json())

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// // ======================= Security ====================
// // Sanitize data
// app.use(mongoSanitize())

// // Set security headers
// app.use(helmet())

// // Prevent XSS attacks
// app.use(xss())

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100,
// })
// app.use(limiter)

// // Prevent http param pollution
// app.use(hpp())

// Enable CORS
app.use(
  cors({
    origin: '*',
  }),
)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// =====================================================

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/collectPoints', collectPoints)
app.use('/api/v1/collects', collects)
app.use('/api/v1/messages', messages)
app.use('/api/v1/certificats', certificats)
app.use('/api/v1/wastes', wastes)
app.use('/api/v1/productCategories', productCategories)
app.use('/api/v1/products', products)
app.use('/api/v1/services', services)
app.use('/api/v1/plasticTypes', plasticTypes)
app.use('/api/v1/recyclableProducts', recyclableProducts)
app.use('/api/v1/voluntaryDropPoints', voluntaryDropPoints)
app.use('/api/v1/garbageTypes', garbageTypes)
app.use('/api/v1/recyclableProductCategories', recyclableProductCategories)
app.use('/api/v1/nutriScores', nutriScores)
app.use('/api/v1/ecoScores', ecoScores)
app.use('/api/v1/novaScores', novaScores)
app.use('/api/v1/origines', origines)
app.use('/api/v1/customers', customers)
app.use('/api/v1/contacts', contacts)
app.use('/api/v1/additives', additives)

app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.render('index'))

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} root URL : http://localhost:${PORT}/api/v1 `
      .white.underline.bold.bgGreen,
  ),
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})
