const { Model } = require('objection');
const knex = require('../config/dbConfig');

Model.knex(knex);

class UserComments extends Model {
    static get tableName() {
        return "comments_history";
    }

    $beforeInsert() {
        this.createdAt = new Date();
    }
    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'comments'],
            properties: {
                id: {type: 'integer'},
                commentor_id: {type: 'integer'},
                postID: {type: 'integer'},
                comment_to_id: {type: 'integer'},
                comments: {type: 'string'}
            }
        }
    }
}

module.exports = UserComments;