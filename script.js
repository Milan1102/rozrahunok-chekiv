const form = document.getElementById("transaction-form");
const sale = document.getElementById("sale");
const amount = document.getElementById("amount");
const litrs = document.getElementById("litrs");
const list = document.getElementById("transaction-list");
const totalElement = document.getElementById("total-display");
const operationClerBtn = document.getElementById("operation-clear");
const totalCleanBtn = document.getElementById("total-clear");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let totalSum = parseFloat(localStorage.getItem("totalSum")) || 0;

renderList();

form.addEventListener("submit", function (e) {
    e.preventDefault(); // 🚫 отменяет перезагрузку страницы

    const saleful = parseFloat((parseFloat(sale.value) * parseFloat(litrs.value)).toFixed(2));
    const finalamont = parseFloat((parseFloat(amount.value) - saleful).toFixed(2));
    totalSum += finalamont;

    const transaction = {
        sale: parseFloat(sale.value),
        amount: parseFloat(amount.value),
        litrs: parseFloat(litrs.value),
        saleful: saleful,
        finalamont: finalamont
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("totalSum", totalSum.toFixed(2));

    renderList();
    form.reset();
});

function renderList() {
    list.innerHTML = "";
    transactions.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = `Сума: ${t.amount} - Літри: ${t.litrs} - Фінальна сума: ${t.finalamont}`;
        list.appendChild(li);
    });

    totalElement.textContent = `Загальна сума: ${totalSum.toFixed(2)}`;
}
operationClerBtn.addEventListener("click", function (){
    transactions = [];
    localStorage.removeItem("transactions");
    renderList();
});
totalCleanBtn.addEventListener("click", function (){
    totalSum = 0;
    localStorage.removeItem("totalSum");
    renderList();
});
