
exports.up = function(knex) {
    return knex.schema.createTable('events', function (table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('address').notNullable();
        table.decimal('value').notNullable();
        table.string('ministrie_id').notNullable();

        //Criação da chave estrangeira
        table.foreign('ministrie_id').references('id').inTable('ministries');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('events');
};
