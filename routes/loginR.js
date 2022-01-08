const express = require('express');
const router = express.Router();
const UserService = require('../services/usersAcc');
const Services = new UserService();
const { authenticationToken, authorizationToken, toLogout } = require('../auth/security')

router.post('/signup', toLogout, async(req, res) => {
    try {
        const data = await req.body
        const result = await Services.checkUp(data);
        if (result) {
            res.send('This account already exist!!')
        }
        else{
            const result2 = await Services.createAcc(req.body);
            res.send(result2)
            console.log(result2);
        }
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})

router.post('/login', toLogout, async(req, res) => {
    try {
        const result = await Services.checkUp(req.body);
        console.log(result[0]);
        if (result) {
            const token = authenticationToken(result)
            res.cookie('key', token).send('You are successfully logged in.')
        }
        else {
            res.send('This account does not exist!!')
        }
    } catch (err) {
        res.send(err)
        console.log(err);
        
    }
})

router.post('/logout', authorizationToken, async(req, res) => {
    try {
        res.clearCookie('key').send('You are logged out now.')
    } catch (err) {
        res.send(err)
        console.log(err);
        
    }
})

module.exports = router;