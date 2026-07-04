// State Management
let totalBudget = 0;
let expenses = [];

// DOM Element Selectors
const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('budget-input');
const expenseForm = document.getElementById('expense-form');
const expenseTitle = document.getElementById('expense-title');
const expenseAmount = document.getElementById('expense-amount');

const budgetDisplay = document.getElementById('budget-display');
const expenseDisplay = document.getElementById('expense-display');
const balanceDisplay = document.getElementById('balance-display');
const balanceCard = document.getElementById('balance-card');
const expenseList = document.getElementById('expense-list');

// Update UI Layout Dashboard Values
function updateDashboard() {
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const netBalance = totalBudget - totalExpenses;

    // Set formatting currency
    budgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
    expenseDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
    balanceDisplay.textContent = `$${netBalance.toFixed(2)}`;

    // Manage balance status layout color
    if (netBalance >= 0) {
        balanceCard.className = 'card net-balance positive';
    } else {
        balanceCard.className = 'card net-balance negative';
    }
}

// Render dynamic items inside Table Rows
function renderExpenses() {
    expenseList.innerHTML = ''; // Wipe list clean before redraw

    expenses.forEach((expense) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${expense.title}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}

// Handle Form Submission: Set Budget
budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    totalBudget = parseFloat(budgetInput.value);
    budgetInput.value = '';
    updateDashboard();
});

// Handle Form Submission: Add Expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newExpense = {
        id: Date.now(), // Generate unique simple id
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    };

    expenses.push(newExpense);
    
    // Clear Input values
    expenseTitle.value = '';
    expenseAmount.value = '';

    renderExpenses();
    updateDashboard();
});

// Action: Delete targeted expense
window.deleteExpense = function(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    renderExpenses();
    updateDashboard();
};