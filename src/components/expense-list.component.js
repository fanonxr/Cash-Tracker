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
    }

    render() {
        return (
            <div>
                <h3>Logged Expenses</h3>
            </div>
        )
    }
}

export { ExpenseList };