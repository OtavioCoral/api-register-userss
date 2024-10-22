//Importar pacote do mysql
const mysql = require('mysql2');
//Crair conexão com banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_api'
});
//Testar Conexão
connection.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log('Mysql conectado');
    }
});
 
module.exports = connection;
//db_config.js