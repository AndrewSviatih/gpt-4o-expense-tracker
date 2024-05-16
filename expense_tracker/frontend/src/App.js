import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import FinancialAnalysis from './components/FinancialAnalysis';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Expense Tracker</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Expenses</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Expense</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/analysis">Financial Analysis</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ExpenseList />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/analysis" element={<FinancialAnalysis />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
