const { Model } = require('objection');
const knex = require('../config/dbConfig');
// const postUpload = require('./postUpload');
Model.knex(knex);

class Records extends Model {
    static get tableName() {
        return "records";
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
            required: ['postID', 'viewerID'],
            properties: {
                id: {type: 'integer'},
                postID: {type: 'integer'},
                vierwerID: {type: 'integer'}
            }
        }
    }
    // static relationMappings() {postActs.userID
    //     upload: {
    //         relation: Model.HasManyRelation
    //         modelClass: postUpload
    //         join: {
    //             from: 'postActs.id, postActs.userID'
    //             to: 'records.postID, records.viewerID'
    //         }
    //     }
    // }
}

module.exports = Records;