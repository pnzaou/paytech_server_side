const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URI

const connexion = async () => {
    try {
        const rep = await mongoose.connect(uri)
        console.log(`Connexion réussie à la base de donnée : ${rep.connection.name}`);
    } catch (error) {
        console.log('Erreur lors de la connexion :', error);
    }
}

module.exports = connexion