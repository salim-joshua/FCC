const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const numerals = [
  { roman: "M", arabic: 1000 },
  { roman: "CM", arabic: 900 },
  { roman: "D", arabic: 500 },
  { roman: "CD", arabic: 400 },
  { roman: "C", arabic: 100 },
  { roman: "XC", arabic: 90 },
  { roman: "L", arabic: 50 },
  { roman: "XL", arabic: 40 },
  { roman: "X", arabic: 10 },
  { roman: "IX", arabic: 9 },
  { roman: "V", arabic: 5 },
  { roman: "IV", arabic: 4 },
  { roman: "I", arabic: 1 },
];

function romanDividers(input) {

  userNumber = input;

  if (input === 0 || isNaN(input)) {
    return (output.innerHTML = `<p>Please enter a valid number</p>`);
  } else if (input < 0) {
    return (output.innerHTML = `<p>Please enter a number greater than or equal to 1</p>`);
  } else if (input >= 4000) {
    return (output.innerHTML = `<p>Please enter a number less than or equal to 3999</p>`);
  } else {
    let romanNumber = "";
    for (let i = 0; i < numerals.length; i++) {
      let divider = numerals[i].arabic;
      let romanNum = numerals[i].roman;
      let nRomanNums = (input - (input % divider)) / divider;
      input = input % divider;
      romanNumber += romanNum.repeat(nRomanNums);
    }
    return (output.innerHTML = `
    <p>${userNumber} converted into Roman Numbers is:</p>
    <p id="roman-result">${romanNumber}</p>
    `);
  }
}

function cleanInput(str) {
  const regex = /[^-0-9]/;
  let cleanNumber = str.replace(regex, "");
  return parseInt(cleanNumber);
}

convertBtn.addEventListener("click", () => {
  let cleanNumber = cleanInput(numberInput.value);
  romanDividers(cleanNumber);
});
