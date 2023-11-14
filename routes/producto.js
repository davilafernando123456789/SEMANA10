const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multipart = require('connect-multiparty');
const path = require('path');  // Añade esta línea
const uploadDir = path.join(__dirname, '../imagenes');
const multiPartMiddleware = multipart({
  uploadDir: uploadDir
});
//api/productos


router.post('/', multiPartMiddleware, productoController.crearProducto);
router.put('/:id', multiPartMiddleware, productoController.actualizarProducto);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.verProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;