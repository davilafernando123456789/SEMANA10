const mongoose = require('mongoose');

const conectarDB = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/simplejwt', {
            useNewUrlParser: true,
            useUnifiedTopology: true
    })
    console.log('Conectado a la base de datos');

    } catch (error) {
        console.log(error);
        process.exit(1); //detiene la app
    }  
}

module.exports = conectarDB;