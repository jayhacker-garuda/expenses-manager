import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { API_URL_MAIN } from './../config/URL';
import { useParams } from "react-router-dom";

const EditExpense = () => {

    const [expenseInfo, setExpenseInfo] = useState({
        name: '',
        amount: '',
        description: ''
    })
    const params = useParams();




    useEffect(() => {
        console.log(params.id)
        fetch(`${API_URL_MAIN}expenses/show/${params.id}`)
            .then(res => res.json())
            .then(data => setExpenseInfo({
                name: data.name,
                amount: data.amount,
                description: data.description
            }))
            .catch((error) => {
                console.log(error);
            })
    }, [params]);

    function onChangeExpenseName(e) {

        setExpenseInfo(prev => {
            return { ...prev, name: e.target.value }
        })
    }

    function onChangeExpenseAmount(e) {
        setExpenseInfo(prev => {
            return { ...prev, amount: e.target.value }
        })
    }

    function onChangeExpenseDescription(e) {
        setExpenseInfo(prev => {
            return { ...prev, description: e.target.value }
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        const expenseObject = {
            id: params.id,
            name: expenseInfo.name,
            amount: expenseInfo.amount,
            description: expenseInfo.description
        };

        fetch(`${API_URL_MAIN}expenses/update`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseObject)
        })
            .then((res) => {
                console.log(res.data)
                console.log('Expense successfully updated')
            }).catch((error) => {
                console.log(error)
            })

        // Redirect to Expense List 
        // param.history.push('/expenses-listing')
    }


    return (
        <div className="form-wrapper">
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={expenseInfo.name} onChange={onChangeExpenseName} />
                </Form.Group>

                <Form.Group controlId="Amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" value={expenseInfo.amount} onChange={onChangeExpenseAmount} />
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={expenseInfo.description} onChange={onChangeExpenseDescription} />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Expense
                </Button>
            </Form>
        </div>
    );
}

export default EditExpense