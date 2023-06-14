const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models

const User = require("./models/User");
const CollectPoint = require("./models/CollectPoint");
const Collect = require('./models/Collect');
const Message = require('./models/Message');
const Certificat = require('./models/Certificat');
const Waste = require('./models/Waste');
// Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const collectPoints = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/collectPoints.json`, "utf-8")
);
const collects = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/collects.json`, 'utf-8')
);

const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/messages.json`, 'utf-8')
);

const certificats = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Certificat.json`, 'utf-8')
);
const wastes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/wastes.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await CollectPoint.create(collectPoints);
    await Collect.create(collects);
    await Message.create(messages);
    await Certificat.create(certificats);
    await Waste.create(wastes);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await CollectPoint.deleteMany();
    await Collect.deleteMany();
    await Message.deleteMany();
    await Certificat.deleteMany();
    await Waste.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
