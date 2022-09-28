// DOM Elements
const passwordElement = document.getElementById('password');
const copyElement = document.getElementById('copy');
const doneElement = document.getElementById('done');
const lengthElement = document.getElementById('inputLength');
const lowercaseElement = document.getElementById('lowercase');
const uppercaseElement = document.getElementById('uppercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');

// Get random lowercase letter
const randLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Get random uppercase letter
const randUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Get random number
const randNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

// Get random symbol
const randSymbol = () => {
  const symbols = '!@#$%-';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// randomFunc
const randomFunc = {
  lower: randLower,
  upper: randUpper,
  number: randNumber,
  symbol: randSymbol,
};

// Generate Btn Event Listener
generate.addEventListener('click', () => {
  copyElement.style.display = 'block';
  doneElement.style.display = 'none';

  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumbers = numbersElement.checked;
  const hasSymbols = symbolsElement.checked;

  passwordElement.innerText = generatePassword(length, hasLower, hasUpper, hasNumbers, hasSymbols);
});

// Generate Password Function
const generatePassword = (length, lower, upper, number, symbol) => {
  // Initialize password variable

  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;

  // Filter out unchecked types
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // If none checked, don't generate
  if (typesCount === 0) {
    return '';
  }

  // Loop over length and call generator function for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }

  //  Add final password to password variable and return it
  finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
};

// Copy Password to Clipboard
copyElement.addEventListener('click', () => {
  if (!password.innerText | (password.innerText === 'Click generate :)')) {
    password.innerText = 'Click generate :)';
  } else {
    navigator.clipboard
      .writeText(passwordElement.innerHTML)
      .then(() => {
        copyElement.style.display = 'none';
        doneElement.style.display = 'block';
        console.log(password.innerText);
      })
      .catch(() => {
        console.log('not copied');
      });
  }

  // if (navigator && navigator.clipboard && navigator.clipboard.writeText)
  //   return navigator.clipboard.writeText();
  // return Promise.reject('The Clipboard API is not available.');

  // // For Older Browsers below
  // const textarea = document.createElement('textarea');
  // const password = passwordElement.innerHTML;

  // if (!password) {
  //   return;
  // }

  // textarea.value = password;
  // document.body.appendChild(textarea);
  // textarea.select();
  // document.execCommand('copy');
  // textarea.remove();
  // alert('Password copied');
});
