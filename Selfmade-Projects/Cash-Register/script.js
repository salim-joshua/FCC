const randomTotal = document.getElementById("random-price");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cidContainer = document.getElementById("cid-div");
const changeDueContainer = document.getElementById("change-due");

let price = 19.5;
let cid = [
  ["PENNY", 2.01],
  ["NICKEL", 3.05],
  ["DIME", 4.1],
  ["QUARTER", 5.25],
  ["ONE", 16],
  ["FIVE", 55],
  ["TEN", 70],
  ["TWENTY", 80],
  ["ONE HUNDRED", 200],
];

let currencyUnits = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

randomTotal.textContent = price;

const getTotal = (arr) => {
  let totalCash = 0;
  arr.forEach((unit) => (totalCash += parseFloat(unit[1])));
  return totalCash;
};

// - IMPLEMENT CENT-CALCULATION (EVERY VALUE TIMES 100), TO PREVENT ROUNDING ISSUES;

const changeDue = (totalCash) => {
  let remainingCash = parseFloat(totalCash - price);
  let totalChange = [];

  console.log(getTotal(cid), remainingCash);

  if(getTotal(cid) < remainingCash)  {
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    const currencyUnitAmount = parseFloat(currencyUnits[i][1]);
    const currencyUnit = currencyUnits[i][0];
    let cuTotal = 0;

    if (
      remainingCash >= currencyUnitAmount &&
      cid[i][1] - currencyUnitAmount >= 0
    ) {
      while (
        remainingCash >= currencyUnitAmount &&
        cid[i][1] - currencyUnitAmount >= 0
      ) {
        cuTotal += currencyUnitAmount;
        cuTotal = parseFloat(cuTotal.toFixed(2));
        remainingCash = parseFloat(remainingCash - currencyUnitAmount).toFixed(2);
        cid[i][1] -= currencyUnitAmount;
        cid[i][1] = parseFloat(cid[i][1]).toFixed(2);
      }
      totalChange.push([currencyUnit, cuTotal]);
    }
  }

  refreshCidDisplay();
  
  if(remainingCash > 0)  {
    return;
  }

  return totalChange;
};

const refreshCidDisplay = () => {
  cidContainer.innerHTML = "<p>AVAILABLE CHANGE</p>";
  cid.forEach((item) => {
    cidContainer.innerHTML += `<p>${item[0]}: \$${item[1]}</p>`;
  });
};

const calculateChange = () => {
  const totalCID = getTotal(cid);
  const totalCash = parseFloat(cash.value);
  changeDueContainer.innerHTML = "";

  if (totalCash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (totalCash.toFixed(2) === price.toFixed(2)) {
    changeDueContainer.innerText =
      "No change due - customer paid with exact cash";
    return;
  } else if (totalCash - price > totalCID) {
    changeDueContainer.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  } else if (totalCash - price - totalCID === 0) {
    const totalChangeDue = changeDue(totalCash);
    changeDueContainer.innerHTML = `<p>Status: CLOSED</p>`;
    totalChangeDue.forEach((item) => {
      changeDueContainer.innerHTML += `<p>${item[0]}: \$${item[1]}</p>`;
    });
    return;
  } else {
    const totalChangeDue = changeDue(totalCash);

    if (totalChangeDue === undefined) {
      changeDueContainer.innerText = "Status: INSUFFICIENT_FUNDS - Can't provide exact change. Please enter a different amount.";
    } else {  
      changeDueContainer.innerHTML = `<p>Status: OPEN</p>`;
      totalChangeDue.forEach((item) => {
        changeDueContainer.innerHTML += `<p>${item[0]}: \$${item[1]}</p>`;
      });
    }
  }
};

refreshCidDisplay();
purchaseBtn.addEventListener("click", calculateChange);
