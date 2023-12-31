const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models

const User = require('./models/User')
const CollectPoint = require('./models/CollectPoint')
const Collect = require('./models/Collect')
const Message = require('./models/Message')
const Certificat = require('./models/Certificat')
const Waste = require('./models/Waste')
const RecyclableProductCategory = require('./models/RecyclableProductCategory')
const ProductCategory = require('./models/ProductCategory')
const Product = require('./models/Product')
const Service = require('./models/Service')
const PlasticType = require('./models/PlasticType')
const RecyclableProduct = require('./models/RecyclableProduct')
const VoluntaryDropPoint = require('./models/VoluntaryDropPoint')
const GarbageType = require('./models/GarbageType')
const NutriScore = require('./models/NutriScore')
const EcoScore = require('./models/EcoScore')
const Origine = require('./models/Origine')
const Customer = require('./models/Customers')
const Contact = require('./models/Contact')
const Additive = require('./models/Additive')
const NovaScore = require('./models/NovaScore')

// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)

const collectPoints = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/collectPoints.json`, 'utf-8'),
)
const collects = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/collects.json`, 'utf-8'),
)

const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/messages.json`, 'utf-8'),
)

const certificats = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Certificat.json`, 'utf-8'),
)
const wastes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/wastes.json`, 'utf-8'),
)
const recyclableproductCategories = JSON.parse(
  fs.readFileSync(
    `${__dirname}/_data/recyclableProductCategories.json`,
    'utf-8',
  ),
)
const productCategories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/productCategories.json`, 'utf-8'),
)
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Products.json`, 'utf-8'),
)
const services = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/services.json`, 'utf-8'),
)
const plasticTypes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/plasticTypes.json`, 'utf-8'),
)
const recyclableProducts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/recyclableProducts.json`, 'utf-8'),
)
const voluntaryDropPoints = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/voluntaryDropPoints.json`, 'utf-8'),
)
const garbageTypes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/garbageType.json`, 'utf-8'),
)
const nutriScores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/nutriScore.json`, 'utf-8'),
)
const ecoScores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/ecoScore.json`, 'utf-8'),
)
const origines = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/origines.json`, 'utf-8'),
)
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, 'utf-8'),
)
const contacts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contacts.json`, 'utf-8'),
)
const additives = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/additive.json`, 'utf-8'),
)
const novaScores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/novaScore.json`, 'utf-8'),
)

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await CollectPoint.create(collectPoints)
    await Collect.create(collects)
    await Message.create(messages)
    await Certificat.create(certificats)
    await Waste.create(wastes)
    await RecyclableProductCategory.create(recyclableproductCategories)
    await ProductCategory.create(productCategories)
    await Product.create(products)
    await Service.create(services)
    await PlasticType.create(plasticTypes)
    await RecyclableProduct.create(recyclableProducts)
    await VoluntaryDropPoint.create(voluntaryDropPoints)
    await GarbageType.create(garbageTypes)
    await NutriScore.create(nutriScores)
    await EcoScore.create(ecoScores)
    await Origine.create(origines)
    await Contact.create(contacts)
    await Customer.create(customers)
    await Additive.create(additives)
    await NovaScore.create(novaScores)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany()
    await CollectPoint.deleteMany()
    await Collect.deleteMany()
    await Message.deleteMany()
    await Certificat.deleteMany()
    await Waste.deleteMany()
    await RecyclableProductCategory.deleteMany()
    await ProductCategory.deleteMany()
    await Product.deleteMany()
    await Service.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
    await VoluntaryDropPoint.deleteMany()
    await GarbageType.deleteMany()
    await NutriScore.deleteMany()
    await EcoScore.deleteMany()
    await Origine.deleteMany()
    await Customer.deleteMany()
    await Additive.deleteMany()
    await NovaScore.deleteMany()
    await Contact.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
