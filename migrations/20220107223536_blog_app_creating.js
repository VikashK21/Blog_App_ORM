
exports.up = function(knex) {
    return knex.schema.createTable('loginRegister', (t) => {
        t.increments();
        t.string('name').notNullable();
        t.string('email').notNullable();
        t.string('password').notNullable();
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('postActs', (t2) => {
        t2.increments();
        t2.string('posts').notNullable();
        t2.string('discriptions').notNullable();
        t2.integer('likes').notNullable();
        t2.integer('dislikes').notNullable();
        t2.integer('userID').notNullable();
        t2.timestamp('createdAt').defaultTo(knex.fn.now());
        t2.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('records', (t3) => {
        t3.increments();
        t3.integer('postID').notNullable();
        t3.integer('viewerID').notNullable();
        t3.string('reaction_sec').notNullable();
        t3.timestamp('createdAt').defaultTo(knex.fn.now());
        t3.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('comments_history', t4 => {
        t4.increments();
        t4.integer('commentor_id');
        t4.integer('postID').notNullable();
        t4.string('comments').notNullable();
        t4.integer('comment_to_id').defaultTo(0);
        t4.timestamp('createdAt').defaultTo(knex.fn.now());
        t4.timestamp('updatedAt').defaultTo(knex.fn.now());

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('postActs')
    .dropTable('records')
    .dropTable('loginRegister')
};

