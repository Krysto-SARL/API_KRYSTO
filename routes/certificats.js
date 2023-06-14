const express = require("express");
// get controller function
const { getCertificat, getCertificats, updateCertificat, createCertificat } = require("../controllers/certificats");
const router = express.Router({mergeParams: true})
const {protect , authorize} = require("../middlewares/auth")
const Certificat = require('../models/Certificat')
const advancedResults = require('../middlewares/advancedResults')


router.route("/").get(advancedResults(Certificat, {
    path: "collect recycler collect",

}), getCertificats).post(createCertificat)
router.route("/:id").get(getCertificat).put(updateCertificat)

module.exports = router;
