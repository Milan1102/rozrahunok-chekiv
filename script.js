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
    transactions.forEach((t, index) => { //index дабаляе індекс до чеку
        const li = document.createElement("li");
        li.textContent = `Сума: ${t.amount} - Літри: ${t.litrs} - Фінальна сума: ${t.finalamont}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌"
        deleteBtn.addEventListener("click", function(){
            totalSum -= t.finalamont;
            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            localStorage.setItem("totalSum", totalSum.toFixed(2));
            renderList();
        });
        li.appendChild(deleteBtn);
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
const saveMonthBtn = document.getElementById("save-month");
const monthSelect = document.getElementById("month-select");
saveMonthBtn.addEventListener("click", function(){
    const selectedMonth = monthSelect.value;
    if (!selectedMonth){
        alert("Будь ласка, виберіть місяць!");
        return;
    }
    //  Получаем текущий список месяцев из хранилища
    let allMonths = JSON.parse(localStorage.getItem("allMonths")) || {};
    //добавляэмо або обновляэмо вибраний
    allMonths[selectedMonth]=totalSum.toFixed(2);
    //зберігаємо назад
    localStorage.setItem("allMonths", JSON.stringify(allMonths));
    alert(`Сума ${totalSum.toFixed(2)} Місяць ${selectedMonth}`);


})
//випливаюче окно збережених даних по місяцях
const showMonthsBtn = document.getElementById("month-date");
const savedMonthsDiv = document.getElementById("saved-months");
showMonthsBtn.addEventListener("click", function(){
    savedMonthsDiv.classList.toggle("hidden");//включае видимість діву
    const allMonths = JSON.parse(localStorage.getItem("allMonths")) || {};//загружаємо дані
    savedMonthsDiv.innerHTML = ""; //очищаємо попередні дані
    //Якщо нічого не має
    if (Object.keys(allMonths).length === 0){
        savedMonthsDiv.textContent = "Немає збережених даних.";
        return;
    }
    const ul = document.createElement("ul");
    //створення списку
    for (let month in allMonths){
        const li = document.createElement("li");
        li.textContent = `📅 ${month} — 💰 ${allMonths[month]} Kč`;
        ul.appendChild(li);
        //кнопка видалення
        const deleteMonthBtn = document.createElement("button");
        deleteMonthBtn.textContent = "❌";
        deleteMonthBtn.style.marginLeft = "10px";
        deleteMonthBtn.addEventListener("click", function(){
            //видаляемо вибраний місяць
            delete allMonths[month];
            localStorage.setItem("allMonths", JSON.stringify(allMonths));
            //обновляемо вигляд списку
            showMonthsBtn.click();//посторнонажмаемо для обновлення
        });
        li.appendChild(deleteMonthBtn);
        ul.appendChild(li);
    }

    savedMonthsDiv.appendChild(ul);
});
