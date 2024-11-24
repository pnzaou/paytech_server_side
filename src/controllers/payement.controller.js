const fetch = require('node-fetch')
require('dotenv').config()
const payementRequestUrl = "https://paytech.sn/api/payment/request-payment"



const payement = async (req, res) => {
    try {
        const params = {
            item_name: req.body.nom,
            item_price: req.body.prix,
            currency: "XOF",
            ref_command:  Math.floor(Date.now() / 1000).toString(),
            command_name: `Paiement ${req.body.nom} via PayTech`,
            env: "test",
            ipn_url: "https://localhost:8080/api/paytech/ipn",
            success_url:"http://localhost:3000",
            cancel_url: "http://localhost:3000"
        }
        const headers = {
            Accept: "application/json",
            'Content-Type': "application/json",
            API_KEY: process.env.PAYTECH_API_KEY,
            API_SECRET: process.env.PAYTECH_SECRET_KEY,
        }
        const response = await fetch(payementRequestUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        })

        const jsonResponse = await response.json()

        if(jsonResponse.success === 1) {
            return res.status(200).json({
                success: true,
                redirect_url: jsonResponse.redirect_url,
                token: jsonResponse.token
            })
        } else {
            return res.status(400).json({
                success: false,
                message: jsonResponse.message || "Erreur inconnue"
            })
        }
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
        });
    }
}

module.exports = payement