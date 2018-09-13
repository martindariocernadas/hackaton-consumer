'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * category Schema
 */
var consumoSchema = new Schema({
    date: {
        type: Date
    },
    tipoEvento: {
        type: Number
    },
    eventoDescripcion: {
        type: String
    },
    subtipo: {
        type: String
    },
    subtipoDescripcion: {
        type: String
    },
    cardId: {
        type: String
    },
    monto: {
        type: String
    },
    currency: {
        type: String
    },
    rubro: {
        type: Number
    },
    rubroDescripcion: {
        type: String
    },
    rubroGrupo: {
        type: String
    },
    grupoDescripcion: {
        type: String
    }
});

mongoose.model('Consumo', consumoSchema);

'use strict';
