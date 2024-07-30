const btnRegister = document.querySelector(".login");



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
    if (!validateInput()) {
        alert("Cannot Login");
    } else {
        alert("Login Successful!");
        window.location.href = "trangchu.html";
    }
});








