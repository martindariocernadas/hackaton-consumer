var mongoose = require('mongoose'),
    consumoSchema = require('./consumo.model'),    
    Consumo = mongoose.model('Consumo'),
    request = require('request'),
    logger = require('../../utils/logger');

//If it isn't production, use the local env file
if(!process.env.NODE_ENV || process.env.NODE_ENV.toUpperCase() !== 'PRODUCTION'){
    const env = require('env2')('./conf/.env');
}

var log = logger().getLogger('recordProcessor');

/*
 |--------------------------------------------------------------------------
 | Crea un nuevo movimiento
 |--------------------------------------------------------------------------
 */
exports.create = function (movimiento) {


    var token='';

    if(movimiento.MERCHANT_TYPE_DESC != ''){
        log.info('Un nuevo movimiento: ' + movimiento.MERCHANT_TYPE_DESC);
        var c = new Consumo({
            date: new Date(movimiento.EVENT_DT),
            tipoEvento: movimiento.DEBIT_CARD_EVENT_TYPE_CD,
            eventoDescripcion: movimiento.DEBIT_CARD_EVENT_TYPE_DESC,
            subtipo: movimiento.EVENT_SUBTYPE_CD,
            subtipoDescripcion: movimiento.EVENT_SUBTYPE_DESC,
            cardId: movimiento.CARD_ID,
            monto: movimiento.EVENT_AMT,
            currency: movimiento.CURRENCY_CD,
            rubro: movimiento.MERCHANT_ENTRY_ADMIN_CD,
            rubroDescripcion: movimiento.MERCHANT_ENTRY_ADMIN_DESC,
            rubroGrupo: movimiento.MERCHANT_GROUP_DESC,
            grupoDescripcion: movimiento.MERCHANT_TYPE_DESC
        });
        
        c.save();

        //Tengo que llamar a la app del back para saber 
        //si el nuevo movimiento puede generar un descuento
        request({
            url: process.env.BACK_URI + process.env.LOGIN_ENDPOINT,
            headers: {'content-type' : 'application/json'},
            method: 'POST',
            body: JSON.stringify( {
                dni: process.env.DNI_LOGIN,
                password: process.env.PASS_LOGIN
            })}, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    body = JSON.parse(body);
                    var token = body.token;
                    request({
                        headers: {'content-type' : 'application/json', 'Authorization': token },
                        url: process.env.BACK_URI +  process.env.CONSUMO_ENDPOINT,
                        method: 'POST',
                        body: JSON.stringify({ movimiento : {
                                date: c.date,
                                ammount: c.monto,
                                categoria: c.rubro,
                                descripcion: c.eventoDescripcion
                                } 
                        })
                    });
                    
                }
            }
        );
    }
}