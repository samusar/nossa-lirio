
exports.up = function(knex) {
    return knex.schema.createTable('ministries', function (table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('leader').notNullable();
        table.string('logo').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ministries');
};
