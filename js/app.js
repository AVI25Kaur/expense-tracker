let expenseChart=null;
const navButtons = document.querySelectorAll("nav button");
console.log(navButtons);

const views = document.querySelectorAll(".view");
console.log(views);

navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    
    views.forEach(function (view) {
      view.classList.add("hidden");
    });
    document.getElementById(button.dataset.view + "-view").classList.remove("hidden");
  });
  if (button.dataset.view === "dashboard") {
    renderDashboard();
  }
  if (button.dataset.view === "history") {
    renderTransactions();
  }
  if (button.dataset.view === "reports") {
    renderReports();
  }
});

let editingIndex = null;
const form=document.getElementById("transaction-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const amount=document.getElementById("amount").value;
  console.log(amount);
  const type=document.getElementById("type").value;
  console.log(type);
  const category=document.getElementById("category").value;
  console.log(category);
  const date=document.getElementById("date").value;
  console.log(date);
  const description=document.getElementById("description").value;
  console.log(description);
  const transaction={
    amount: amount,
    type: type,
    category: category,
    date: date,
    description: description
  };
  console.log(transaction);
  const saved=localStorage.getItem("transactions");
  const transactions=saved ? JSON.parse(saved) : [];
  if(editingIndex !== null) {
    transactions[editingIndex] = transaction;
    editingIndex = null;
  } else {
    transactions.push(transaction);
  }
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  renderDashboard();
  renderReports();
  form.reset();
  document.getElementById("add-view").classList.add("hidden");
  document.getElementById("history-view").classList.remove("hidden");
  document.getElementById("dashboard-view").classList.add("hidden");
  document.getElementById("reports-view").classList.add("hidden");
  
});

const historyList=document.getElementById("history-list");

historyList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.dataset.index;

    const saved = localStorage.getItem("transactions");
    const transactions = saved ? JSON.parse(saved) : [];
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    renderDashboard();
    renderReports();
  }
});



historyList.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    const index = event.target.dataset.index;
    const saved = localStorage.getItem("transactions");
    const transactions = saved ? JSON.parse(saved) : [];
    const transaction = transactions[index];

    document.getElementById("amount").value = transaction.amount;
    document.getElementById("type").value = transaction.type;
    document.getElementById("category").value = transaction.category;
    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value = transaction.description;
    editingIndex = index;

    document.getElementById("add-view").classList.remove("hidden");
    document.getElementById("dashboard-view").classList.add("hidden");
    document.getElementById("history-view").classList.add("hidden");
    document.getElementById("reports-view").classList.add("hidden");
  }
});
renderDashboard();


function renderReports() {
    const saved = localStorage.getItem('transactions');
    const transactions = saved ? JSON.parse(saved) : [];
    const categoryTotals = {};
    transactions.forEach(function (t) {
      if (t.type === 'expense') {
        const cat= t.category;
        const amt = parseFloat(t.amount);
        categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
      }
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    const ctx = document.getElementById('expenseChart').getContext('2d');
    if(expenseChart !== null) {
        expenseChart.destroy();
    }
    expenseChart = new Chart(ctx, {
      type:"pie",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            "#e74c3c",
            "#3498db",
            "#2ecc71",
            "#f1c40f",
            "#9b59b6",
            "#1abc9c", ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
}

renderReports();