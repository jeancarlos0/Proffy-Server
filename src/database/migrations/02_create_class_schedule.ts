import Knex from 'knex';

//Realiza alterações no banco
export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table =>{
        table.increments('id').primary;
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        //relaciona com o ID do usuário
        //CASCADE atualiza os ids se o id for att na tabela users, e remove as classes se o id for removido
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

//Desfaz alterações no banco
export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}