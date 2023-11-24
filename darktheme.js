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
        localStorage.setItem("currTheme", "dark");
    }
}