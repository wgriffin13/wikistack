const express = require('express');
const router = express.Router();
const views = require('../views/index')
const { Page, User } = require('../models/index')

router.get('/', (req, res, next) => {
    Page
        .findAll()
        .then( (pages) => {
            res.send(views.main(pages))
        })
        .catch(next)
});

router.post('/', async (req, res, next) => {

    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status,
    // });
    try {
        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email,
            }
        });
        const page = await Page.create(req.body);
        //console.log(Object.keys(page.__proto__));
        page.setAuthor(user);
        res.redirect(`/wiki/${page.slug}`)
    } catch (error) {next(error)}
    // Page.save()
    //     .then( () => {
    //         res.redirect(`/wiki/${page.slug}`)
    //     })
    //     .catch(next);
});

router.get('/add', (req, res, next) => {
    res.send(views.addPage())
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        const author = await page.getAuthor();
        res.send(views.wikiPage(page, author));
    } catch (error) {next(error)}
    // let page = undefined
    // Page
    //     .findOne({
    //         where: {
    //             slug: req.params.slug
    //         }
    //     })
    //     .then( (p) => {
    //         page = p
    //         author = page.getAuthor()
    //     })
    //     .then( (author) => {
    //         res.send(views.wikiPage(page, author))
    //     })
    //     .catch(next);
});

module.exports = router;
