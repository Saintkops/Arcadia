exports.up = function(knex) {
    return knex.schema.createTable('veterinarian', table => {
      table.increments('veterinarian_id').primary(); 
      table.string('firstName', 250).notNullable();
      table.string('lastName', 250).notNullable();
      table.string('email', 250).unique().notNullable();
      table.string('password', 250).notNullable();
      table.string('role', 50).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('veterinarian'); 
  };
  