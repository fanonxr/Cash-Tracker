import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// component to add expenses to the database
class CreateExpense extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Create Expense log</h3>
            </div>
        )
    }
}

export { CreateExpense };