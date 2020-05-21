const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userData = require('../data/users');
const path = require('path');

router.get('/', async (req, res) => {
	if (req.session && req.session.user)
        res.redirect('/private');
    else
        res.status(403).render('form/loginForm');
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const user = await userData.getUser(username);
    if (!user) {
        res.status(401).render('form/loginForm', {send : "Invalid username and/or password"});
        return;
    }
    const password = req.body.password
    const result = await bcrypt.compare(password, user.hashedPassword)
    if (result) {
        // if using session then set user in session since middleware is checking req.session.user
        req.session.user = {user: user._id}
        res.redirect('/private');
    } else {
        res.render('form/loginForm', {send : "Invalid username and/or password"}).status(401);
        return;
    }
});

router.get('/private', async (req, res) => {
    // check for session instead of req.cookie
    // if you are using req.cookie then you need cookieparser dependency
    if (req.session && req.session.user){
        const user = await userData.getUserID(req.session.user.user);
        // updated to render private
        res.render('form/private',
            {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                profession: user.profession,
                bio: user.bio
            }
        );

    } else {
        res.status(403).render('form/loginForm', {send: "You are not logged in"});
    }
});

router.get('/logout', async (req, res) => {
	res.clearCookie("AuthCookie");
	res.render('form/loginForm', {send: "Logged out"});
});

module.exports = router;