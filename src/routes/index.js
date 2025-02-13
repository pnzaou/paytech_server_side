const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const payement = require('../controllers/payement.controller')
const Reservation = require('../models/Reservation.model')
const ModePaiement = require('../models/ModePaiement.model')
const Paiement = require('../models/Paiement.model')
const router = express.Router()

router.post("/api/payement", payement)
router.post('/api/paytech/ipn', async (req, res) => {
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

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        if (
            SHA256Encrypt(my_api_secret) === api_secret_sha256 &&
            SHA256Encrypt(my_api_key) === api_key_sha256
        ) {
            if (type_event === 'sale_complete') {
                
                let modePaiement = await ModePaiement.findOne({nom: payment_method})

                if(!modePaiement) {
                    modePaiement = new ModePaiement({nom: payment_method})
                    await modePaiement.save({ session })
                }

                const reservationId = JSON.parse(custom_field).reservationId

                await Paiement.create([{
                    montant: item_price,
                    modePaiementId: modePaiement._id,
                    reservationId
                }], { session })

                await Reservation.findByIdAndUpdate(reservationId, {
                    $set: { statut: "Confirmé" }
                }, { session })

                await session.commitTransaction()
                session.endSession()

                return res.status(200).json({ success: true, message: "Paiement confirmé" });

            } else if (type_event === 'sale_canceled') {
                console.log(`Paiement annulé pour la commande ${ref_command}`)
            }
    
            res.status(200).send("Notification reçue avec succès")
        } else {
            console.error("Notification non autorisée !")
            res.status(403).send("Non autorisé")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Une erreur est survenue veuillez réessayer.', 
            erreur: true,
            success: false
        })
    }
})

module.exports = router
