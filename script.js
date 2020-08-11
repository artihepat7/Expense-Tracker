const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const ulList = document.getElementById("list");
const balance = document.getElementById("balance");
const incomeMoney = document.getElementById("money-plus");
const expenseMoney = document.getElementById("money-minus");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transcations")
);

let transcations =
  localStorage.getItem("transcations") !== null ? localStorageTransactions : [];

function getDataAndShowList() {
  event.preventDefault();

  let textValue = text.value;
  let amountValue = amount.value;
  if (textValue.trim() && amountValue.trim()) {
    const transc = {
      id: Math.floor(Math.random() * 100),
      text: textValue,
      amount: +amountValue,
    };
    transcations.push(transc);
    text.value = " ";
    amount.value = " ";
    storeInLocalStorage();
    //list item
    updateDomList();
  } else {
    alert("please enter text and amount");
  }
}

//store data in localStorage
function storeInLocalStorage() {
  localStorage.setItem("transcations", JSON.stringify(transcations));
}
function updateDomList() {
  ulList.innerHTML = "";
  transcations.forEach((trans) => {
    const li = document.createElement("li");
    if (trans.amount >= 0) {
      li.classList.add("plus");
    } else {
      li.classList.add("minus");
    }
    li.innerHTML = ` 
    <p>${trans.text}</p>
    <p>${trans.amount}</p>
    <button class="delete-btn" onclick='removeTrans(${trans.id})'>
      x
    </button>`;

    ulList.appendChild(li);
  });
  updateIncExpBalance();
}

//remove transcation on click
function removeTrans(id) {
  transcations = transcations.filter((trans) => trans.id !== id);
  storeInLocalStorage();
  init();
}

function updateIncExpBalance() {
  let income = transcations.filter((trans) => {
    if (trans.amount >= 0) {
      return trans;
    }
  });
  let expense = transcations.filter((trans) => {
    if (trans.amount < 0) {
      return trans;
    }
  });

  let incomeVal = income.reduce((acc, item) => acc + item.amount, 0);
  let expenseVal = expense.reduce((acc, item) => acc + item.amount, 0);
  let finalbalance = incomeVal - expenseVal * -1;
  // console.log(incomeVal, expenseVal, finalbalance);
  balance.innerHTML = `$${finalbalance}`;
  incomeMoney.innerText = `$${incomeVal}`;
  expenseMoney.innerText = `$${expenseVal * -1}`;
  //init();
  //update in dom
}

function init() {
  updateDomList();
  updateIncExpBalance();
}
init();
form.addEventListener("submit", getDataAndShowList);
