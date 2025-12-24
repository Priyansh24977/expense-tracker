const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();

  text.value = "";
  amount.value = "";
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

function renderTransactions() {
  list.innerHTML = "";

  transactions.forEach(transaction => {
    const sign = transaction.amount < 0 ? "-" : "+";
    const li = document.createElement("li");

    li.classList.add(transaction.amount < 0 ? "minus" : "plus");

    li.innerHTML = `
      ${transaction.text}
      <span>${sign}₹${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(li);
  });

  updateValues();
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0);
  const incomeTotal = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  const expenseTotal = amounts.filter(a => a < 0).reduce((a, b) => a + b, 0);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${incomeTotal}`;
  expense.innerText = `₹${Math.abs(expenseTotal)}`;
}

form.addEventListener("submit", addTransaction);
renderTransactions();
