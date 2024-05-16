import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

function FinancialAnalysis() {
  const [data, setData] = useState({ categories: [], amounts: [] });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/financial_analysis')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const chartData = {
    labels: data.categories,
    datasets: [{
      data: data.amounts,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div>
      <h2>Financial Analysis</h2>
      <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
        <Doughnut data={chartData} />
      </div>
      <ul className="list-group mt-4">
        {data.categories.map((category, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {category}
            <span className="badge badge-primary badge-pill">{data.amounts[index]} ₽</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/" className="btn btn-secondary">Back to Expenses</Link>
      </div>
    </div>
  );
}

export default FinancialAnalysis;
