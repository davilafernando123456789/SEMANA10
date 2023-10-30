//rutas producto

const express = require('express');
const router = express.Router();
const productosController = require('./controllers/productosController');

//api/productos

router.post('', productosController.crearProducto);
router.get('', productosController.obtenerProductos);
router.put('/:id', productosController.actualizarProducto);
router.get('/:id', productosController.verProducto);
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
