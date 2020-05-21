const express = require('express');
const router = express.Router();
const palindrome = require("../palindrome")

router.post('/', async (req, res) => {
    let palindromeInput = req.body;
    if(!palindromeInput['text-to-test']) {
        res.status(400).render('layouts/error')
    } else {
        const result = await palindrome.isPalindrome(palindromeInput['text-to-test'])
        res.render('layouts/main', {
            input: palindromeInput['text-to-test'],
            result: result
        })
    }
})

module.exports = router