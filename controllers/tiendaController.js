const Tienda = require("../models/Tienda");

exports.crearTienda = async (req, res) => {
    try {
        const tienda = new Tienda(req.body);

        await tienda.save();
        res.send(tienda);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.find();
        res.json(tiendas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarTienda = async (req, res) => {
    try {
        const { departamento, distrito, nombre, latitud, longitud, cantidad } = req.body;

        let tienda = await Tienda.findById(req.params.id);

        if (!tienda) {
            res.status(404).json({ msg: 'No existe la tienda' });
            return;
        }

        tienda.departamento = departamento;
        tienda.distrito = distrito;
        tienda.nombre = nombre;
        tienda.latitud = latitud;
        tienda.longitud = longitud;
        tienda.cantidad = cantidad;

        tienda = await tienda.save();
        res.json(tienda);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTiendasPorDistrito = async (req, res) => {
    try {
        const { distrito } = req.query;
        const distritoLowerCase = distrito.toLowerCase(); // Convierte el distrito a minúsculas
        console.log('Distrito recibido:', distrito);
        console.log('Distrito convertido a minúsculas:', distritoLowerCase);

        const tiendas = await Tienda.find({ distrito: distritoLowerCase });
        console.log('Tiendas encontradas:', tiendas);

        res.json(tiendas);
    } catch (error) {
        console.log('Error en obtenerTiendasPorDistrito:', error);
        res.status(500).send('Hubo un error');
    }
}


exports.verTienda = async (req, res) => {
    try {
        let tienda = await Tienda.findById(req.params.id);

        if (!tienda) {
            res.status(404).json({ msg: 'No existe la tienda' });
        }

        res.json(tienda);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarTienda = async (req, res) => {
    try {
        let tienda = await Tienda.findById(req.params.id);

        if (!tienda) {
            res.status(404).json({ msg: 'No existe la tienda' });
        }

        tienda = await Tienda.findOneAndRemove(req.params.id);

        res.json({ msg: 'La tienda: ' + tienda.nombre + ' se ha eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
