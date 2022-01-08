const { Model } = require('objection');
const knex = require('../config/dbConfig');
// const Posts = require('./postUpload')
Model.knex(knex);

class LoginR extends Model {
    static get tableName() {
        return "loginRegister";
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
            required: ['email', 'password'],
            properties: {
                id: {type: 'integer'},
                name: {type: 'string', minLength: 3, maxLength: 30},
                email: {type: 'string', minLength: 10, maxLength: 50},
                password: {type: 'string', minLength: 8}
            }
        }
    }
    // static relationMappings() {
    //     post: {
    //         relation: Model.HasOneRelation
    //         modelClass: Posts
    //         join: {
    //             from: 'loginRegister.id'
    //             to: 'postActs.userID'
    //         }
    //     }
    // }
}

module.exports = LoginR;