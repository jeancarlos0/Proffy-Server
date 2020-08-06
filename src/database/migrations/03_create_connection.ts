import Knex from 'knex';

//Realiza alterações no banco
export async function up(knex: Knex){
    return knex.schema.createTable('connections', table =>{
        table.increments('id').primary;
        //relaciona com o ID do usuário
        //CASCADE atualiza os ids se o id for att na tabela users, e remove as classes se o id for removido
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        //Now() retorna o horario atual que será o valor ddefault
        table.timestamp('created_at').defaultTo('now()').notNullable();
    })
}

//Desfaz alterações no banco
export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}