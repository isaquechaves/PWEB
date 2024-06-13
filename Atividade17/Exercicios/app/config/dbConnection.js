var sql = require ('mssql');
require('dotenv').config();

var pass = process.env.DB_PASS;
var connSQLServer = function (){
    const config = {
        user: 'bd1913021',
        password: pass,
        database: 'BD',
        server: 'apolo',
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    }
        return sql.connect(config);
}

module.exports = function(){
    console.log('Oautoload carregou o módulo de conexão com o bd');
    return connSQLServer;
}