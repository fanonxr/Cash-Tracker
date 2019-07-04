import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// component to add expenses to the database
class CreateExpense extends Component {
    constructor(props) {
        super(props);

        // set initial state of component
        // fields will be empty
        this.state = {
            expenseName: '',
            itemDescription: '',
            price: 0,
            date: new Date(),
            users: [],
            expenses: [],
        }
    }

    // check to see if there are any expenses in the database and load them in
    componentDidMount() {
        axios.get('http://localhost:8000/expenses')
            .then((response) => {
                if (response.data.length > 0) {
                    this.setState({
                        expenses: response.data.map((expense) => {
                            return expense.expenseName
                        }),
                        expenseName: response.data[0].expenseName
                    })
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
            })
    }

    // method to change the expense name
    onChangeExpenseName = (e) => {
        this.setState({
            expenseName: e.target.value
        });
    }

    // changing the expense details
    onChangeExpenseDetails = (e) => {
        this.setState({
            itemDescription: e.target.value
        });
    }

    // changing the price of the expense
    onChangePrice = (e) => {
        this.setState({
            price: e.target.value
        });
    }

    // changing the date of when the expense occured
    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }

    // handle submit to process changes
    onSubmit = (e) => {
        // prevent the form from submitting once the page loads
        e.preventDefault();

        // get the values from the updated states

        const expense = {
            expenseName: this.state.expenseName,
            itemDescription: this.state.itemDescription,
            price: this.state.price,
            date: this.state.date
        }

        console.log(expense);

        // insert the values into the datebase

        axios.post('http://localhost:8000/exepenses/add', expense)
            .then((res) => {
                console.log(res.data);
            })

        // route back to the homepage - list of expenses
    }

    render() {
        return (
            <div>
                <h3>Add an Expense to the log</h3>
                <form onSubmit={this.onSubmit}>
                    {/* expense name details info */}
                    <div className="form-group">
                        <label>Expense: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.expenseName}
                            onchange={this.onChangeExpenseName}>
                            {
                                this.state.expenses.map((expense) => {
                                    return <option key={expense} value={expense}>
                                        {expense}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    {/* description input info */}
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.itemDescription}
                        onChange={this.onChangeExpenseDetails}>
                        </input>
                    </div>
                    {/* price input info */}
                    <div className="form-group">
                        <label>Price (in dollars): </label>

                        <input
                            type="text"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                        {/* date input info */}
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    {/* submit button */}
                    <div className="form-group">
                            <input type="submit" value="Create Exercise Log" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}

export { CreateExpense };