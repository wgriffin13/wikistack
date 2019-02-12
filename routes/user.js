const express = require('express');
const router = express.Router();
const views = require('../views/index')
const { Page, User } = require('../models/index')

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId);
        const pages = await Page.findAll({
            where: {
                authorId: req.params.userId
            }
        });
        res.send(views.userPages(user, pages));
    } catch (error) {next(error)}
});

router.get('/', (req, res, next) => {
    User
        .findAll()
        .then( users => {
            res.send(views.userList(users))
        })
        .catch(next)
});

module.exports = router;
