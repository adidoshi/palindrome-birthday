const date = document.querySelector('#date');
const btnInput = document.querySelector('#btn');

const palindromeDiv = document.querySelector('#palindrome');
const notPalindromeDiv = document.querySelector('#not-palindrome');

const loadingGIF = document.querySelector('#timer-img');

btnInput.addEventListener('click', loadingOn);

let $31days = [1, 3, 5, 7, 8, 10, 12];
let $30days = [4, 6, 9, 11];

function loadingOn() {
    loadingGIF.classList.remove('hidden');
    notPalindromeDiv.innerText = "";
    palindromeDiv.innerHTML = "";
    setTimeout(clickHandler, 4000);
}

function clickHandler() {
    loadingGIF.classList.add('hidden');
    let dateInput = date.value;
    palindromeOrNot(dateInput);
}

function palindromeOrNot(dateInput) {
    let year = dateInput.slice(0, 4);
    let month = dateInput.slice(5, 7);
    let day = dateInput.slice(8, 10);
    let formatOne = year + month + day;
    let formatTwo = month + day + year;
    let formatThree = month + day + year.slice(2, 4);

    if (dateInput.length > 0) {
        if (checkFormat(formatOne)) {
            palindromeDiv.innerText = "Aww!!! Your birthdate is palindrome in the format " + year + "-" + month + "-" + day;
        } else if (checkFormat(formatTwo)) {
            palindromeDiv.innerText = "Aww!!! Your birthdate is palindrome in the format " + month + "-" + day + "-" + year;
        } else if (checkFormat(formatThree)) {
            palindromeDiv.innerText = "Aww!!! Your birthdate is palindrome in the format " + month + "-" + day + "-" + year.slice(2, 4);
        } else {
            day = +(day);
            year = +(year);
            month = +(month);
            let forwardPalindrome = checkForward(day, month, year);
            let backwardPalindrome = checkBackward(day, month, year);
            if (forwardPalindrome[1] < backwardPalindrome[1]) {
                notPalindromeDiv.innerHTML = "Ahhh! Your birthdate is not palindrome. Nearest palindrome date is " + forwardPalindrome[0] + " You missed it by " + forwardPalindrome[1] + " days.";
            } else {
                notPalindromeDiv.innerHTML = "Ahhh! Your birthdate is not palindrome. Nearest palindrome date is " + backwardPalindrome[0] + " You missed it by " + backwardPalindrome[1] + " days.";
            }
        }
    }
}

function checkForward(day, month, year) {
    let noOfDays = 0;
    while (month < 13){
        noOfDays += 1;
        // console.log(day, month, year);
        let formatOne = lessThanTenCheck(year) + lessThanTenCheck(month) + lessThanTenCheck(day);
        let formatTwo = lessThanTenCheck(month) + lessThanTenCheck(day) + lessThanTenCheck(year);
        let formatThree = lessThanTenCheck(month) + lessThanTenCheck(day) + lessThanTenCheck(year).slice(2, 4);
        if (checkFormat(formatOne)) {
            formatOne = lessThanTenCheck(year) + "-" + lessThanTenCheck(month) + "-" + lessThanTenCheck(day);
            return[formatOne, noOfDays];
        }
        else if(checkFormat(formatTwo)) {
            formatTwo = lessThanTenCheck(month) + "-" + lessThanTenCheck(day) + "-" + lessThanTenCheck(year);
            return[formatTwo, noOfDays];
        }
        else if(checkFormat(formatThree)) {
            formatThree = lessThanTenCheck(month) + "-" + lessThanTenCheck(day) + "-" + lessThanTenCheck(year).slice(2, 4);
            return[formatThree, noOfDays];
        }
        else {
            day += 1;
            if(day > maxDate(month, year)){
                day = 1;
                month += 1;
                if(month > 12){
                    month = 1;
                    year += 1;
                }
            }
        } 
    }
}

function checkBackward(day, month, year) {
    let noOfDays = 0;
    while (month > 0){
        noOfDays += 1;
        // console.log(day, month, year);
        let formatOne = lessThanTenCheck(year) + lessThanTenCheck(month) + lessThanTenCheck(day);
        let formatTwo = lessThanTenCheck(month) + lessThanTenCheck(day) + lessThanTenCheck(year);
        let formatThree = lessThanTenCheck(month) + lessThanTenCheck(day) + lessThanTenCheck(year).slice(2, 4);
        if (checkFormat(formatOne)) {
            formatOne = lessThanTenCheck(year) + "-" + lessThanTenCheck(month) + "-" + lessThanTenCheck(day);
            return[formatOne, noOfDays];
        }
        else if(checkFormat(formatTwo)) {
            formatTwo = lessThanTenCheck(month) + "-" + lessThanTenCheck(day) + "-" + lessThanTenCheck(year);
            return[formatTwo, noOfDays];
        }
        else if(checkFormat(formatThree)) {
            formatThree = lessThanTenCheck(month) + "-" + lessThanTenCheck(day) + "-" + lessThanTenCheck(year).slice(2, 4);
            return[formatThree, noOfDays];
        }
        else {
            day -= 1;
            if (day < 1) {
                day = maxDate(month-1, year)
                month -= 1;
                if(month < 1){
                    year -= 1;
                    month = 12;
                }
            }
        } 
    }
}

function maxDate(month, year){
    var maxDate = 31;
    if($31days.includes(month)){
        maxDate = 31;
    }
    else if ($30days.includes(month)){
        maxDate = 30;
    }
    else if(checkYear(year)){
        maxDate = 29;
    }
    else{
        maxDate = 28;
    }
    return maxDate;
}

function lessThanTenCheck(number){
    if(number<10){
        var newNumber = '0' + number.toString();
    }
    else{
        var newNumber = number.toString();
    }
    return newNumber;
}

function checkFormat(format){
    let reverseFormat = format.split("").reverse().join("");
    return reverseFormat === format;
}

function checkYear(year) {
    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }