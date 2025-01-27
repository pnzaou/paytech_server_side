const express = require('express')
require('dotenv').config()
const payement = require('../controllers/payement.controller')
const router = express.Router()

router.post("/api/payement", payement)
router.post('/api/paytech/ipn', (req, res) => {
    const SHA256Encrypt = (password) => {
        let crypto = require('crypto')
        let sha256 = crypto.createHash('sha256')
        sha256.update(password)
        return sha256.digest('hex')
    }

    const {
        type_event,
        ref_command,
        item_name,
        item_price,
        api_key_sha256,
        api_secret_sha256,
    } = req.body

    const my_api_key = process.env.PAYTECH_API_KEY 
    const my_api_secret = process.env.PAYTECH_SECRET_KEY
    
    console.log("venant api_key", api_key_sha256)
    console.log("local api_key", my_api_key)
    console.log("venant api_secret", api_secret_sha256)
    console.log("local api_secret", my_api_secret)
    console.log("LE BODY", req.body)
    return

    // if (
    //     SHA256Encrypt(my_api_secret) === api_secret_sha256 &&
    //     SHA256Encrypt(my_api_key) === api_key_sha256
    // ) {
    //     if (type_event === 'sale_complete') {
    //         console.log(`Paiement réussi pour la commande ${ref_command}`);
    //         // Traitez la commande : marquez-la comme "payée"
    //     } else if (type_event === 'sale_canceled') {
    //         console.log(`Paiement annulé pour la commande ${ref_command}`);
    //         // Traitez l'annulation : marquez-la comme "annulée"
    //     }

    //     res.status(200).send("Notification reçue avec succès");
    // } else {
    //     console.error("Notification non autorisée !");
    //     res.status(403).send("Non autorisé");
    // }
})

module.exports = router
