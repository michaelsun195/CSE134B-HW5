function darkMode() {
    const currTheme = localStorage.getItem("currTheme");
    if (currTheme === "dark") {
        document.body.style.backgroundColor = "rgb(237, 241, 245)";
        document.body.style.color = "black";
        let textInputs = document.querySelectorAll(":is(input[type='text'], input[type='email'], textarea, button)");
        for (let input of textInputs) {
            input.style.backgroundColor = "white";
            input.style.color = "black";
        }
        let outputs = document.querySelectorAll("output");
        for (let output of outputs) {
            output.style.backgroundColor = "rgb(237, 241, 245)";
            output.style.color = "black";
            if (output.classList.contains("form-error")) output.style.color = "transparent";
        }
        localStorage.setItem("currTheme", "light");
    }
    else {
        document.body.style.backgroundColor = "rgb(21, 31, 46)";
        document.body.style.color = "white";
        let textInputs = document.querySelectorAll(":is(input[type='text'], input[type='email'], textarea, button)");
        for (let input of textInputs) {
            input.style.backgroundColor = "rgb(11, 22, 34)";
            input.style.color = "white";
        }
        let outputs = document.querySelectorAll("output");
        for (let output of outputs) {
            output.style.backgroundColor = "rgb(21, 31, 46)";
            output.style.color = "white";
            if (output.classList.contains("form-error")) output.style.color = "transparent";
        }
        localStorage.setItem("currTheme", "dark");
    }
}

const validNameChars = /^([a-zA-Z]){1,1000}$/;
const validEmailChars = /^([a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]){1,1000}@([a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]){1,1000}[.]([a-zA-Z0-9-.]){1,1000}$/;
const validCommentsChars = /^([a-zA-Z0-9!#$%&'*+-/=?^_`{|}~."(),:;<>@[\] ]){1,1000}$/;

document.addEventListener("DOMContentLoaded", function () {
    const formErrors = [];
    const commentInfo = document.getElementById("comments-info");
    const commentError = document.getElementById("comments-error");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const commentField = document.getElementById("comments");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const errorField = document.getElementById("form-errors");
    commentInfo.innerHTML = "Characters left: 1000";
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    commentError.innerHTML = "";

    document.getElementById("submit-button").addEventListener("click", (event) => {
        let validComments = validCommentsChars.test(commentField.value);
        let validName = validNameChars.test(nameField.value);
        let validEmail = validEmailChars.test(emailField.value);
        if (!(validComments && validName && validEmail)) {
            let currError = {
                name: nameField.value,
                email: emailField.value,
                comments: commentField.value,
                error: "Unknown error"
            };
            if (!validName) {
                if (nameField.value.length < 1) {
                    nameField.setCustomValidity("Enter a name.");
                    currError.error = "Name: empty";
                }
                else if (nameField.value.length > 1000) {
                    nameField.setCustomValidity("Name is too long.");
                    currError.error = "Name: too long";
                }
                else {
                    nameField.setCustomValidity("Names can only contain English letters for the time being.");
                    currError.error = "Name: contains special characters";
                }
            }
            else if (!validEmail) {
                if (emailField.value.length < 1) {
                    emailField.setCustomValidity("Enter an email.");
                    currError.error = "Email: empty";
                }
                else if (emailField.value.length > 1000) {
                    emailField.setCustomValidity("Email is too long.");
                    currError.error = "Email: too long";
                }
                else {
                    emailField.setCustomValidity("Use the email format provided below.");
                    currError.error = "Email: improper format";
                }
            }
            else if (!validComments) {
                if (commentField.value.length < 1) {
                    commentField.setCustomValidity("Enter some comments.");
                    currError.error = "Comments: empty";
                }
                else if (commentField.value.length > 1000) {
                    commentField.setCustomValidity("Comments are too long.");
                    currError.error = "Comments: too long";
                }
                else {
                    commentField.setCustomValidity("Comments cannot contain nonstandard characters.");
                    currError.error = "Comments: contains special characters";
                }
            }
            formErrors.push(JSON.stringify(currError));
            event.preventDefault();
        }
        else {
            commentField.setCustomValidity("");
            nameField.setCustomValidity("");
            emailField.setCustomValidity("");
            errorField.value = formErrors;
        }
        commentField.reportValidity();
        nameField.reportValidity();
        emailField.reportValidity();
    });
    
    commentField.addEventListener("input", function (e) {
        commentError.classList.remove("form-error");
        commentInfo.innerHTML = "Characters left: " + (1000 - e.target.value.length);
        if (e.target.value.length >= 1000) commentInfo.style.color = "rgb(200, 8, 21)";
        else if (e.target.value.length >= 900) commentInfo.style.color = "rgb(255, 191, 0)";
        let validComments = validCommentsChars.test(e.target.value);
        if (!validComments) {
            if (e.target.value.length < 1) commentError.innerHTML = "Please enter some comments.";
            else commentError.innerHTML = "Please do not use special characters.";
            commentError.classList.add("form-error");
        }
        else commentError.innerHTML = "";
    });
    nameField.addEventListener("input", function (e) {
        nameError.classList.remove("form-error");
        let validName = validNameChars.test(e.target.value);
        if (!validName) {
            nameError.innerHTML = "Please enter a valid name.";
            nameError.classList.add("form-error");
        }
        else nameError.innerHTML = "";
    });
    emailField.addEventListener("input", function (e) {
        emailError.classList.remove("form-error");
        let validEmail = validEmailChars.test(e.target.value);
        if (!validEmail) {
            emailError.innerHTML = "Please enter a valid email.";
            emailError.classList.add("form-error");
        }
        else emailError.innerHTML = "";
    });
});