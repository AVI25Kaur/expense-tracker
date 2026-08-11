function renderTransactions() {
    const saved = localStorage.getItem('transactions');
    const transactions = saved ? JSON.parse(saved) : [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (transactions.length === 0) {
        historyList.innerHTML = '<p>No transactions yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'history-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    transactions.forEach(function (transaction, index) {
        const row = document.createElement('tr');
        row.className = transaction.type === 'income' ? 'row-income' : 'row-expense';
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.type}</td>
            <td>${transaction.description}</td>
            <td>₹${parseFloat(transaction.amount).toFixed(2)}</td>
            <td>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    historyList.appendChild(table);
}

renderTransactions();

function renderDashboard() {
    const saved = localStorage.getItem('transactions');
    const transactions = saved ? JSON.parse(saved) : [];

    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(function (t) {
        const amount = parseFloat(t.amount);
        if (t.type === 'income') {
            totalIncome += amount;
        } else if (t.type === 'expense') {
            totalExpense += amount;
        }
    });
    const netBalance = totalIncome - totalExpense;

    document.getElementById('total-income').textContent ="₹" + totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = "₹" + totalExpense.toFixed(2);
    document.getElementById('net-balance').textContent = "₹" + netBalance.toFixed(2);
}