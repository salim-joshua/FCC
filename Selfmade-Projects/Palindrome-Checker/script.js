const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultContainer = document.getElementById("result");

function cleanStringToReverse (str) {
  const regex = /[^a-zA-Z0-9]/g;
  let palindrome = str.replace(regex, '').toLowerCase();
  let revPalindrome = palindrome.split('').reverse().join('');

  return revPalindrome === palindrome;
}

function checkPalindrome() {
  let userInput = textInput.value;
  if(userInput === null || userInput === "") {
    alert("Please input a value");
  } else {
    let isPalindrome = cleanStringToReverse(textInput.value);

    if(isPalindrome) {
      console.log(userInput + " is a palindrome");
      resultContainer.innerHTML = `${userInput} is a palindrome`
    } else {
      console.log(userInput + " is not a palindrome");
      resultContainer.innerHTML = `${userInput} is not a palindrome`
    }
  } 
  
  
}

checkButton.addEventListener("click", checkPalindrome);