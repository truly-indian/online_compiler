const router = require('express').Router()

router.get('/' , (req,res) => {
    console.log(req.user.id)
 res.send('you are logged in ' + req.user.username)
})

module.exports = router