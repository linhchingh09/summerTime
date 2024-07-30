const inputUsernameRegister = document.getElementById("username");
const inputPasswordRegister = document.getElementById("password");
const inputCPasswordRegister = document.getElementById("confirm");
const btnRegister = document.querySelector(".submit");



function validateInput() {
    let formElements = document.querySelector(".form");
    let inputElements = formElements.querySelectorAll(".input");
    let isValid = true;
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value === "") {
            inputElements[i].parentElement.querySelector(".error-message").innerText = `Please enter your ${inputElements[i].id}`;
            isValid = false;
        } else {
            inputElements[i].parentElement.querySelector(".error-message").innerText = "";
        }
    }
    return isValid;
}

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    check1();
    if (inputPasswordRegister.value !== inputCPasswordRegister.value ) {
        alert("Invalid password");
    } else if (!validateInput()) {
        alert("Cannot Signup");
    } else{
        alert("Signup Successful!");
        window.location.href = "signin.html";
    }
});


const checkbox = document.getElementById("checkbox");
const button = document.getElementsByTagName("button")[0];

function check1() {
    if(checkbox.checked === true){
        button.style.cursor = "pointer";
        button.removeAttribute("disabled")
    }else{
        button.style.cursor = "no-drop";
        button.addAttribute("disabled", " ")
    }
}



function addNew() {
    validateInput();
    let formElements = document.querySelector(".form");
    let errorElements = formElements.querySelectorAll(".error-message");
    let arrErrorElement = [];
    for (let i = 0; i < errorElements.length; i++) {
        arrErrorElement.push(errorElements[i].innerText);
    }
    let check = arrErrorElement.every(value => value === "");
    if (check) {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let userInfo = localStorage.getItem("Users") ? JSON.parse(localStorage.getItem("Users")) : [];
        userInfo.push({
            name: username,
            password: password
        });
        localStorage.setItem("Users", JSON.stringify(userInfo));
    }
}
