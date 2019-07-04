const router = require('express').Router();
let Expense = require('../models/expense.models');

// route to get all expense data
router.route('/').get((req, res) => {
    Expense.find()
        .then((expense) => {
            res.json(expense);
        }).catch((err) => {
            res.status(400).json('Error: ' + err);
        })
});

// route to add an expense
router.route('/add').post((req, res) => {
    const expenseName = req.body.expenseName;
    const itemDescription = req.body.itemDescription;
    const price = req.body.price;
    const date = Date.parse(req.body.date);

    // create a new expense instance
    const newExpense = new Expense({
        expenseName,
        itemDescription,
        price,
        date
    });

    // save the new expense to the database
    newExpense.save()
        .then(() => {
            res.json('Expense added to the DB');
        }).catch((err) => {
            res.status(400).json('Error: ' + err);
        })
});

// route to get specific expense --get by id
router.route('/:id').get((req, res) => {
    Expense.findById(req.params.id) // gets the id from the URL
        .then((expense) => {
            res.json(expense);
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        })
});

// route to delete a specific expense
router.route('/:id').delete((req, res) => {
    Expense.findById(req.params.id)
        .then(() => {
            res.json('Expense deleted from DB');
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
    })
})

// route to update a specific expense
router.route('/update/:id').post((req, res) => {
    Expense.findById(req.params.id)
        .then((expense) => {
            expense.expenseName = req.body.expenseName;
            expense.itemDescription = req.body.itemDescription;
            expense.price = req.body.price;
            expense.date = Date.parse(req.body.date);

            // save the updated details to the db
            expense.save()
                .then(() => {
                    res.json('Expense updated! ');
                })
                .catch((err) => {
                    res.status(400).json('Error: ' + err);
                })
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        })
})

module.exports = router;