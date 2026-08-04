function renderTransactions(){
    const saved=localStorage.getItem('transactions');
    const transactions=saved?JSON.parse(saved):[];
    const historyList=document.getElementById('history-list');
    historyList.innerHTML='';
    transactions.forEach(function(transaction,index){
        const item=document.createElement('div');
        item.innerHTML=`
            <span>${transaction.date}</span>
            <span>${transaction.category}</span>
            <span>${transaction.type}</span>
            <span>${transaction.description}</span>
            <span>${transaction.amount}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;
        historyList.appendChild(item);
    });
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