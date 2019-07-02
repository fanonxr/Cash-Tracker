const router = require('express').Router();
let User = require('../models/user.models');

// handle incoming http get requests : localhost:8000/users/
router.route('/').get((req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        })
});

// handle http post request : localhost:8000/users/add
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username }); // create a new instance of the user model with username

    // save the new user instance to the database
    newUser.save()
        .then(() => {
            res.json('User added');
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
    })
})

module.exports = router;