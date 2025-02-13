const mongoose = require('mongoose')
const { Schema, model } = mongoose

const paiementModel = new Schema({
    montant: {type: Number, required: true},
    type: {type: String, default: "Payé en totalité"},
    reservationId: {type: Schema.Types.ObjectId, ref: 'Reservation'},
    modePaiementId: {type: Schema.Types.ObjectId, ref: 'ModePaiement'}
},{timestamps: true})

module.exports = model('Paiement', paiementModel)