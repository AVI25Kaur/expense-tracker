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
});

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
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
});