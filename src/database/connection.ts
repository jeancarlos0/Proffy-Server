import knex from 'knex';
import path from 'path';

//O DB é manipulado utilizando Knex que facilita a escrita de SQL via JS

/**
    Parametros:
    
    Client: Qual banco estou usando
    Coonection: Dadoss da conexão, ex: onde fica armazenado o banco
*/
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,

});

export default db;