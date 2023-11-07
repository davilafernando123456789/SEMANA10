const mongoose = require('mongoose');

const TiendaSchema = mongoose.Schema({
  departamento: {
    type: String,
    required: true
  },
  distrito: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  latitud: {
    type: Number,
    required: true
  },
  longitud: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Tienda', TiendaSchema);
