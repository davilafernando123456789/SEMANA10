const Producto = require("../models/Producto");
const multipart = require('connect-multiparty');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../imagenes');

const multiPartMiddelware = multipart({
    uploadDir: uploadDir
});

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.verProducto = async (req, res) => {
    try {
        let products = await Producto.findById(req.params.id);
        if (!products) {
            res.status(404).json({ msg: 'No existe el producto' });
        }
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let products = await Producto.findById(req.params.id);
        if (!products) {
            res.status(404).json({ msg: 'No existe el producto' });
        }
        products = await Producto.findOneAndRemove(req.params.id);
        res.json({ msg: 'El producto: ' + products.producto + ' se ha eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.crearProducto = async (req, res) => {
    try {
        console.log("Imprimiendo producto que llega");
        console.log(req.body);
        console.log("************");

        // Asegúrate de que req.body.data esté definido
        if (!req.body.data) {
            return res.status(400).json({ error: 'Falta información requerida para crear el producto' });
        }

        // Parsea req.body.data
        const productoData = JSON.parse(req.body.data);

        const producto = new Producto(productoData);

        if (req.file) {
            const imagen = req.file;
            producto.imagen = {
                nombre: imagen.originalname,
                ruta: `/imagenes/${imagen.originalname}`
            };
        }

        await producto.save();
        console.log(producto);
        res.json(producto);
    } catch (error) {
        console.log(error); // Imprime el error en la consola del servidor
        res.status(500).json({ error: 'Hubo un error al crear el producto' });
    }
};



exports.actualizarProducto = async (req, res) => {
    try {
        const { producto, categoria, ubicacion, precio } = req.body;
        let productoActualizado = await Producto.findById(req.params.id);

        if (!productoActualizado) {
            return res.status(404).json({ error: 'No existe el producto' });
        }

        // Actualizar campos del producto
        productoActualizado.producto = producto;
        productoActualizado.categoria = categoria;
        productoActualizado.ubicacion = ubicacion;
        productoActualizado.precio = precio;

        // Verificar si se adjuntó una nueva imagen y actualizar la ruta
        if (req.files && req.files.imagen) {
            const nuevaImagen = req.files.imagen;
            const imagePath = path.join(uploadDir, nuevaImagen.originalFilename);
            fs.renameSync(nuevaImagen.path, imagePath);

            // Eliminar la imagen anterior asociada al producto
            if (productoActualizado.imagen && productoActualizado.imagen.nombre) {
                const oldImagePath = path.join(uploadDir, productoActualizado.imagen.nombre);
                fs.unlinkSync(oldImagePath);
            }

            // Actualizar la información de la imagen en el modelo
            productoActualizado.imagen = {
                nombre: nuevaImagen.originalFilename,
                ruta: `/imagenes/${nuevaImagen.originalFilename}`
            };
        }

        await productoActualizado.save();
        res.json(productoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al actualizar el producto' });
    }
}
