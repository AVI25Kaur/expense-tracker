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
        `;
        historyList.appendChild(item);
    });
}

renderTransactions();