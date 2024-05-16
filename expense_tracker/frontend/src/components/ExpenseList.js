import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/expenses/${id}`)
      .then(() => {
        setExpenses(expenses.filter(expense => expense[0] !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Expenses</h2>
      <div className="mb-3">
        <Link to="/add" className="btn btn-primary">Add Expense</Link>
        <Link to="/analysis" className="btn btn-secondary ml-2">Financial Analysis</Link>
      </div>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense[0]}>
              <td>{expense[1]}</td>
              <td>{expense[2]}</td>
              <td>{expense[3]}</td>
              <td>{expense[4]}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(expense[0])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
