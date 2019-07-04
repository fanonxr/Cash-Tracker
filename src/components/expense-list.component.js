import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// indivdual Expense Component - function
const Expense = props => (
    <tr>
        <td>{props.expense.expenseName}</td>
        <td>{props.expense.itemDescription}</td>
        <td>{props.expense.price}</td>
        <td>{props.expense.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.expense._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.expense._id)}}>delete</a>
        </td>
    </tr>
)

class ExpenseList extends Component {
    constructor(props) {
        super(props);

        // configure state
        // will load from the database all current expenses
        // store it in an array
        this.state = {
            expenses: []
        };
    }

    // component did mount will load in all the data before the page renders
    componentDidMount() {
        // fetch the data with axios
        axios.get('http://localhost:8000/expenses/')
            .then(response => {
                this.setState({ expenses: response.data });
            })
            .catch(error => {
                console.log("Error: " + error);
            })
    }

    // delete the expenses from the database
    // takes in the id - which is provided by the url
    deleteExpense = (id) => {
        // fetch from the database
        axios.delete('http://localhost:5000/expenses/' + id)
            .then((response) => {
                console.log(response.data);
            })
        // generates _id var whenever an expense object is created and added to the database
        this.setState({
            // return all elements that do no match the id argument
            expenses: this.state.expenses.filter((element) => {
                return element._id !== id;
            })
        });
    }

    // return Expense components displaying the expense details
    expenseList = () => {
        return this.state.expenses.map((currentExpense) => {
            // return a specific expense component
            return <Expense expense={currentExpense} deleteExpense={this.deleteExpense} key={currentExpense._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Expenses</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.expenseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export { ExpenseList };