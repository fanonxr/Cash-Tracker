import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class EditExpense extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Edit Expense</h3>
            </div>
        )
    }
}

export { EditExpense };