const Users = require('../models/loginR');
const Posts = require('../models/postUpload');
const Records = require('../models/record');
const Comments = require('../models/uComments')
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

            let current_like_count = result[0].likes;
            let current_dislike_count = result[0].dislikes;
            let ld = false;

            if (reactions['likes']) {
                current_like_count += 1;
                console.log('likes');
                ld = 'likes';
            }
            else {
                current_dislike_count += 1;
                console.log('dislikes');
                ld = 'dislikes';
            }

            if (ld === 'likes' || ld === 'dislikes') {
                ld = await this.keepingRecord(reactions, ld);
                if (ld) {
                    await Posts.query().update({
                        likes: current_like_count,
                        dislikes: current_dislike_count
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

    async keepingRecord(record, reactionSec) {
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
                    viewerID: record.userID,
                    reaction_sec: reactionSec
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
    
    async delReaction(pID, vID) {
        try {
            const result = await Records.query().findOne({ postID: pID, viewerID: vID });
            if(result) {
                await Records.query().deleteById(result.id);
                const result2 = await Posts.query().findOne({ id: pID })
                const updateReaction = result2[result.reaction_sec] - 1;
                console.log(updateReaction, 'update');
                if (result.reaction_sec === 'likes') {
                    console.log(result);
                    await Posts.query().update({ likes: updateReaction }).where({ id: pID })
                    return 'You have removed your reaction.';
                }
                await Posts.query().update({ dislikes: updateReaction }).where({ id: pID })
                return 'You have removed your reaction.';
            }
            return "Haven't reacted yet on this post!!"
        } catch (err) {
            return err
        }
    }

    async delComment(ID, uID) {
        try {
            const result = await Comments.query().where({ id: ID, commentor_id: uID}).orWhere({ id: ID, comment_to_id: uID });
            if (result.length>0) {
                await Comments.query().delete().where({id: ID});
                return 'The comment is deleted.'
            }
            return 'There is no comment on this post of this ID!!'
        } catch (err) {
            return err;
            
        }
    }

    async userComment(postID, user, comment) {
        try {
            const result = await Posts.query().findOne({id: postID})
            if (result) {
                await Comments.query().insert({ postID: postID, commentor_id: user, comments: comment.comments, comment_to_id: result.userID});
                return 'Your comment sent.'
            }
            return "Couldn't find the post!!"
        } catch (err) {
            return err;
            
        }
    }

    async replyToComment(ID, user, comment) {
        try {
            const result = await Comments.query().findOne({id: ID})
            if (result) {
                await Comments.query().insert({ postID: result.postID, commentor_id: user, comments: comment.comments, comment_to_id: result.comment_to_id});
                return 'Your reply sent.'
            }
            return "Couldn't find the commentor!!"
        } catch (err) {
            return err;
            
        }
    }

    async allComments(id) {
        try {
            const result = await Comments.query().where({comment_to_id: id});
            return result;
        } catch (err) {
            return err;
            
        }
    }


}

