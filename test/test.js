var login = require('axios'),
    createConsumo = require('axios');
    
const env = require('env2')('../conf/.env');

//Tengo que llamar a la app del back para saber 
//si el nuevo movimiento puede generar un descuento
login({
    method: 'post',
    url: process.env.BACK_URI + process.env.LOGIN_ENDPOINT,
    headers: {'content-type' : 'application/json'},
    data: {
        dni: process.env.DNI_LOGIN,
        password: process.env.PASS_LOGIN
    }
}).then(function (res){
    var token = res.data.token;
    createConsumo({
        method: 'post',
        url: process.env.BACK_URI +  process.env.CONSUMO_ENDPOINT,
        headers: {'content-type' : 'application/json', 'Authorization': token},
        data: {
            movimiento : {
                date: new Date(),
                ammount: 1000,
                categoria: 'SUPERMERCADO',
                descripcion:'Compra en coto',
                cardId: 345
            } 
        }
    }).then(function(res){
        console.info('Se creó un movimiento');
    }).catch(function(error){
        console.error('Error al crear el movimiento ' + error);
    });

}).catch(function (error) {
    console.error('Error al hacer el login ' + error);
});