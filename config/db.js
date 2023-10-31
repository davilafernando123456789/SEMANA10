const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/simplejwt', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Conectado a la base de datos simplejwt`);

    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la app
    }
}

module.exports = conectarDB