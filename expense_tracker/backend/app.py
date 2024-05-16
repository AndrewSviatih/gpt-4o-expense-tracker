from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)  # Разрешить CORS для всех маршрутов

def init_db():
    with sqlite3.connect('expenses.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS expenses (
                            id INTEGER PRIMARY KEY,
                            category TEXT NOT NULL,
                            description TEXT,
                            amount REAL NOT NULL,
                            date TEXT NOT NULL
                        )''')
        conn.commit()

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    with sqlite3.connect('expenses.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM expenses")
        expenses = cursor.fetchall()
    return jsonify(expenses)

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    category = data['category']
    description = data['description']
    amount = data['amount']
    date = data['date']
    with sqlite3.connect('expenses.db') as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO expenses (category, description, amount, date) VALUES (?, ?, ?, ?)",
                       (category, description, amount, date))
        conn.commit()
    return jsonify({"message": "Expense added successfully"})

@app.route('/api/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    with sqlite3.connect('expenses.db') as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
        conn.commit()
    return jsonify({"message": "Expense deleted successfully"})

@app.route('/api/financial_analysis', methods=['GET'])
def financial_analysis():
    with sqlite3.connect('expenses.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT category, SUM(amount) FROM expenses GROUP BY category")
        expenses_by_category = cursor.fetchall()
    categories = [expense[0] for expense in expenses_by_category]
    amounts = [expense[1] for expense in expenses_by_category]
    return jsonify({"categories": categories, "amounts": amounts})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
