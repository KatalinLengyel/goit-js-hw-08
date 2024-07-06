import throttle from "lodash.throttle";

const form = document.querySelector("form");
const email = document.querySelector("input");
const message = document.querySelector("textarea");

let inputState = localStorage.getItem("feedback-form-state");
inputState = JSON.parse(inputState || '{}');
if (inputState.email) {
    email.value = inputState.email;
}

if (inputState.message) {
    message.value = inputState.message;
}

const storeInput = throttle((currentInput) => {
    
    const name = currentInput.target.name;
    const value = currentInput.target.value;
    let currentState = localStorage.getItem("feedback-form-state");
    currentState = JSON.parse(currentState || '{}');
    currentState[name] = value;
    console.log(currentState);
    localStorage.setItem("feedback-form-state", JSON.stringify(currentState))
}, 500);

email.addEventListener("keyup", storeInput);

message.addEventListener("keyup", storeInput);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(`Email: ${email.value}`);
    console.log(`Message: ${message.value}`);
    localStorage.removeItem("feedback-form-state");
    email.value = "";
    message.value = "";
})

