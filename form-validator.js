const form = document.getElementById("form");
const formItems = document.querySelectorAll(".form-item");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword1 = document.getElementById("password");
const userPassword2 = document.getElementById("password2");
const message = document.getElementById("message");
const resetBtn = document.querySelector("button[type='reset']");

// Display error message and red border
const displayError = (input, message) => {
  const formItem = input.parentElement;
  formItem.className = 'form-item error';
  // const span = formItem.querySelector('span');
  const span = input.nextElementSibling;
  span.innerText = message;
}

// Display success message and green border
const displaySuccess = (input) => {
  const formItem = input.parentElement;
  formItem.className = 'form-item success';
}

// Email validation
const checkEmail = (input, max) => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(input.value.length > max) {
    displayError(input, `E-mail must have at most ${max} characters`);
  }
  else {
    if(regExp.test(input.value.trim())) {
      displaySuccess(input);
    }
    else {
      displayError(input, 'E-mail is not valid');
    }
  }
}

// Check all fields
const checkFields = (inputsArr) => {
  inputsArr.forEach(function(input) {
    if(input.value.trim() === '') {
      displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
      // displayError(input, `${getFieldName(input)} is required`);
    }
    else {
      displaySuccess(input);
    }
  });
}

// Check input length
const checkLength = (input, min, max) => {
  if(input.value.length < min) {
    displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must have at least ${min} characters`);
    // displayError(input, `${getFieldName(input)} must have at least ${min} characters`);
  } 
  else if(input.value.length > max) {
    displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must have at most ${max} characters`);
    // displayError(input, `${getFieldName(input)} must have at most ${max} characters`);
  } 
  else {
    displaySuccess(input);
  }
}

// Check if passwords match
const checkMatch = (input1, input2) => {
  if(input1.value !== input2.value) {
    displayError(input2, 'Passwords do not match');
  }
}

// Get fieldname with capital letter
// const getFieldName = (input) => {
//   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkFields([userName, userEmail, userPassword1, userPassword2, message]);
  checkLength(userName, 5, 25);
  checkLength(userPassword1, 6, 20);
  checkEmail(userEmail, 40);
  checkMatch(userPassword1, userPassword2);
  checkLength(message, 10, 120);

  const greenFields = document.querySelectorAll(".form-item.success");
  console.log(greenFields.length);

  if(greenFields.length == formItems.length) {
    setTimeout(() => {
      alert("Form submitted!");
      form.reset();
      formItems.forEach((item) => item.className = "form-item");
    }, 700);
  }
});

// Reset Button
resetBtn.addEventListener("click", () => { 
  formItems.forEach((item) => {
    item.className = "form-item";
  });
});