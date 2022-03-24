import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { API_URL_MAIN } from './../config/URL';

export default class ExpenseTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    deleteExpense() {
        const expenseId = {
            id: this.props.obj.id
        }
        fetch(`${API_URL_MAIN}expenses/delete`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseId)
        })
            .then((res) => {
                console.log('Expense removed deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        
        return (

            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.amount}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <Link className="edit-link" to={"/edit-expense/" + this.props.obj.id}>
                        <Button size="sm" variant="info">Edit</Button>
                    </Link>
                    <Button onClick={this.deleteExpense} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}