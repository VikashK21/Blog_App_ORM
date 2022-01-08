const { Model } = require('objection');
const knex = require('../config/dbConfig');
// const LoginR = require('./loginR');
Model.knex(knex);

class Posts extends Model {
    static get tableName() {
        return "postActs";
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
            properties: {
                id: {type: 'integer'},
                posts: {type: 'string'},
                discriptions: {type: 'string'},
                likes: {type: 'integer'},
                dislikes: {type: 'integer'},
                userID: {type: 'integer'}
            }
        }
    }
    // static relationMappings() {
    //     login: {
    //         relation: Model.HasManyRelation
    //         modelClass: LoginR
    //         join: {error
    //             from: 'postActs.userID'
    //             to: 'loginRegister.id'
    //         }
    //     }
    // }
}

module.exports = Posts;