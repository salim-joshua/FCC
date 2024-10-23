const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

const validateNumber = () => {
  const numberRegex =
    /^(1?)(\s?[0-9]{3}\s?|\s?\([0-9]{3}\)\s?|[0-9]{3}-)([0-9]{3}\s?|-[0-9]{3})([0-9]{4}|-[0-9]{4})$/;
  const inputNumber = userInput.value;

  if (inputNumber === "") {
    alert("Please provide a phone number");
    return;
  } else {
    numberRegex.test(inputNumber)
      ? (result.innerHTML = `Valid US number: ${inputNumber}`)
      : (result.innerHTML = `Invalid US number: ${inputNumber}`);
  }
};

checkBtn.addEventListener("click", validateNumber);
clearBtn.addEventListener("click", () => {
  userInput.value = "";
  result.innerHTML = "";
});
