const Users = require('../models/loginR');
const Posts = require('../models/postUpload');
const Records = require('../models/record');
const bcrypt = require('bcrypt');


module.exports = class UserService {
    async createAcc(data) {
        try {
            const pass = await bcrypt.hash(data.password, 10);
            data['password'] = `${pass}`;
            await Users.query().insert(data);
            return 'You are successfully signed up.';
        } catch (err) {
            return err;

        }
    }
    async checkUp(data) {
        try {
            const result = await Users.query().findOne({
                email: data.email
            })
            console.log(result);
            if (result) {
                await bcrypt.compare(data.password, result.password)
                return result
            }
            return false;
        } catch (err) {
            console.log(err);

        }
    }
    async findAll() {
        try {
            return await Posts.query();
        } catch (err) {
            return err;

        }
    }
    async likesDis(reactions) {
        try {
            const result = await Posts.query().where({
                id: reactions.id
            })

            if (result.length == 0) {
                return 'The post ID does not exist!!';
            }

            let change = result[0].likes;
            let change2 = result[0].dislikes;
            let ld = false;

            if (reactions['likes']) {
                reactions['likes'] = change + 1;
                reactions['dislikes'] = change2;
                console.log('likes');
                ld = true;
            }
            else if (reactions['dislikes']) {
                reactions['likes'] = change;
                reactions['dislikes'] = change2 + 1;
                console.log('dislikes');
                ld = true;
            }
            else {
                reactions['likes'] = change;
                reactions['dislikes'] = change2;
            }

            if (ld) {
                ld = await this.keepingRecord(reactions);
                if(ld) {
                    await Posts.query().update({
                        likes: reactions.likes,
                        dislikes: reactions.dislikes
                    }).where({ id: reactions.id })
                    return 'You reacted on this post.'
                }
                return 'You have already reacted on this post!!';
            }
            return 'Nothing much reaction on the post!!';

        } catch (err) {
            console.log(err);
        }
    }

    async keepingRecord(record) {
        try {
            const result = await Records.query().where({
                postID: record.id,
                viewerID: record.userID
            })
            if (result.length > 0) {
                return false;
            }
            else {
                await Records.query().insert({
                    postID: record.id,
                    viewerID: record.userID
                })
                return true;
            }
        } catch (err) {
            console.log(err);
        }
    }


    async createPost(data) {
        try {
            console.log(data);
            await Posts.query().insert(data);

            return 'You have posted a new post.'
        } catch (err) {
            return err;

        }
    }

    async totalLD() {
        try {
            const result = await Posts.query().select("id", "userID", "posts", "discriptions", "likes", "dislikes")
            return result;
        } catch (err) {
            return err;
        }
    }


}

