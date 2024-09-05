let dropdowns = document.querySelectorAll(".form_to select");
let btn = document.querySelector('.btn');
let form = document.querySelector('.fromSelect');
let to = document.querySelector('.Slectot');
const BASE_URL = "https://v6.exchangerate-api.com/v6/e109d3c9bf002e91ae1f51af/latest/";

let selectedVal = (dropDownsbox, currnycode, newoption) => {
  if (dropDownsbox.className === 'fromSelect' && currnycode === 'USD') {
    newoption.selected = true;
  } else if (dropDownsbox.className === 'Slectot' && currnycode === 'PKR') {
    newoption.selected = true;
  }
}

let updateImg = (element) => {
  let currnycode2 = element.value;
  let currnycode2Val = countryList[currnycode2];
  let newSrc = `https://flagsapi.com/${currnycode2Val}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;

  console.log(currnycode2);
}

// Iterating through each dropdown element
for (let dropDownsbox of dropdowns) {
  for (let currnycode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currnycode;
    newoption.value = currnycode;
    dropDownsbox.append(newoption);
    selectedVal(dropDownsbox, currnycode, newoption);
  }
  dropDownsbox.addEventListener('change', (e) => {
    updateImg(e.target);
  });
}

// Button click event listener
btn.addEventListener('click', async (e) => {
  e.preventDefault();
  let amountValue = document.querySelector("#inputBox");
  let originalValue = amountValue.value;
  if (originalValue === "" || originalValue < 1) {
    originalValue = 1;
    amountValue.value = '1';
  }
  
  try {
    // Fetch exchange rates based on the selected "from" currency
    let res = await fetch(`${BASE_URL}${form.value.toUpperCase()}`);
    let data = await res.json();
    
    // Access the exchange rate for the selected "to" currency
    let rate = data.conversion_rates[to.value.toUpperCase()];

    let convertedAmount = originalValue * rate;
    let display = document.querySelector(".disply p");
    display.innerText = `1 ${form.value} = ${rate} ${to.value}\n${originalValue} ${form.value} = ${convertedAmount.toFixed(2)} ${to.value}`;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
  }
});
