const express = require('express');
const router = express.Router();
const UserService = require('../services/usersAcc');
const Services = new UserService();
const { authorizationToken } = require('../auth/security')
const joi = require('joi');


router.get('/allBlogs', authorizationToken, async (req, res) => {
    try {
        const result = await Services.findAll();
        res.send(result)
    } catch (err) {
        res.send(err)

    }
});

router.get('/TotalLD', authorizationToken, async (req, res) => {
    try {
        const result = await Services.totalLD();
        res.send(result);
    } catch (err) {
        res.send(err)

    }
})

router.post('/blogPost', authorizationToken, async (req, res) => {
    try {
        const data = await req.body
        // userID is from JWT...
        const schemaV = joi.object({
            posts: joi.string().required(),
            discriptions: joi.string().required()
        })
        var schemaValidated = schemaV.validate(data);
        if (schemaValidated.error) {
            return res.status(500).json({
                message: schemaValidated.error.message
            })
        } else {
            schemaValidated = schemaValidated.value;
        }
        schemaValidated['userID'] = Number(req.userID);
        schemaValidated['likes'] = 0;
        schemaValidated['dislikes'] = 0;

        const result = await Services.createPost(schemaValidated)
        res.send(result);
        console.log(result)
    } catch (err) {
        res.send(err);

    }
})

router.post('/blogReactions/:id', authorizationToken, async (req, res) => {
    try {
        const data = await req.body;
        const schemaV = joi.object({
            likes: joi.bool().required(),
            dislikes: joi.bool().required()
        })
        var schemaValidated = schemaV.validate(data);
        if (schemaValidated.error) {
            return res.status(500).json({
                message: schemaValidated.error.message
            })
        } else {
            schemaValidated = schemaValidated.value;
        }
        schemaValidated['id'] = Number(req.params.id);
        schemaValidated['userID'] = Number(req.userID);
        const result = await Services.likesDis(schemaValidated);
        res.send(result);

    } catch (err) {
        console.log(err);
        res.send(err);

    }
})

module.exports = router;