// arrays for possible characters

var lowerCharactersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCharacterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numericCharacterArray = ["1", "2", "3", "4", "5" , "6", "7", "8", "9", "0"];
var specialCharactersArray = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePass();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// options for passwords, prompts user for what length and what character to include. will null if nothing is selected or if a length not between 8 and 128 is selected
function getPasswordOption() {
  var length = parseInt(prompt("How many characters?"));

  if (length < 8 || length > 128) {
    alert("Must be at least 8 characters and less than or equal to 128 characters.")
    return null
  }

  var hasSpecialCharacters = confirm("Click ok if you want special characters.");

  var hasNumericCharacters = confirm("Click ok if you want numeric characters.");

  var hasUppercaseCharacters = confirm("Click ok if you want uppercase characters.");

  var hasLowercaseCharacters = confirm("Click ok if you want lowercase characters.");

  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowercaseCharacters === false &&
    hasUppercaseCharacters === false
  ) {
    alert("Must select at least one character type.")
    return null
  };

  var passwordOptionsObject = {
    pwdLength: length,
    pwdSpecial: hasSpecialCharacters,
    pwdUpper: hasUppercaseCharacters,
    pwdLower: hasLowercaseCharacters,
    pwdNumeric: hasNumericCharacters,

  }
  
  return passwordOptionsObject

}

// random index array generator
function getRandom (array) {
  var randomIndex = Math.floor(Math.random() * array.length)
  var randomElement = array[randomIndex]

  return randomElement
}
// generate the actual password using conditions pulled from the object returned bt the options function
function generatePass() {
  var options = getPasswordOption()
  var initialPass = []
  var possibleCharacters = []
  var guaranteedCharacters = []
  var finalPass = []


  if (options.pwdSpecial) { 
    possibleCharacters = possibleCharacters.concat(specialCharactersArray);
    guaranteedCharacters.push(getRandom(specialCharactersArray));
  }

  if (options.pwdLower) {
    possibleCharacters = possibleCharacters.concat(lowerCharactersArray);
    guaranteedCharacters.push(getRandom(lowerCharactersArray));
  }

  if (options.pwdUpper) {
    possibleCharacters = possibleCharacters.concat(upperCharacterArray);
    guaranteedCharacters.push(getRandom(upperCharacterArray));
  }

  if (options.pwdNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacterArray);
    guaranteedCharacters.push(getRandom(numericCharacterArray));
  }
// for loop adds possible characters to the inital passwork created
  for ( var i = 0; i < (options.pwdLength - guaranteedCharacters.length); i++){
    initialPass.push(getRandom(possibleCharacters));
  }
// adds the guaranteed characters based on the user's selected options to the inital password
  finalPass = initialPass.concat(guaranteedCharacters);
//returns and prints the password without commas or quotations
  return finalPass.join("")
}

/* Psuedo Code 
-->MAIN FUNCTION: When button is clicked, prompted to include: 
1. Character length, minimum 8 maximum 128
2. lower case
3. upper case
4. numeric
5. special characters

After prompts, generates password with at least 1 of each criteria met randomly <-- End MAIN function

need: 
character arrays
a) lowercase
b) uppercase
c) numeric
d) special

ideas 
- start character length --> creates random lowercase password
- criteria selection: 
  uppercase --> randomly make characters capitalized
  numeric --> randomly replace items with a number
  special characters --> randomly replace items with a special char


  Fucntion 
  */