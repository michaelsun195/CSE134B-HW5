const getInit = {
    method: "GET",
};

const weatherRequest = new Request("https://api.weather.gov/gridpoints/SGX/55,21/forecast", getInit);
fetch(weatherRequest)
    .then(async (response) => {
        let test = await new Response(response.body).json();
        document.getElementById("forecast").innerHTML = test["properties"]["periods"][0]["shortForecast"];
        document.getElementById("temperature").innerHTML = test["properties"]["periods"][0]["temperature"];
    });

function submitForm(currRating) {
    let formInput = "question=How%20satisfied%20are%20you%3F&sentBy=JS&rating=" + currRating;
    const postInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Sent-By": "JS"
        },
        body: formInput,
    };
    let submission = new Request("https://httpbin.org/post", postInit);
    fetch(submission)
        .then(async (response) => {
            let test = await new Response(response.body).json();
            console.log(test);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const star1 = document.getElementById("1-empty");
    const star2 = document.getElementById("2-empty");
    const star3 = document.getElementById("3-empty");
    const star4 = document.getElementById("4-empty");
    const star5 = document.getElementById("5-empty");
    const ratingField = document.getElementById("rating-field");
    const ratingMessage = document.getElementById("rating-message");
    const colorSelected = document.getElementById("color-selected");
    const colorUnselected = document.getElementById("color-unselected");
    let select1 = false;
    let select2 = false;
    let select3 = false;
    let select4 = false;
    let select5 = false;
    let selectedColor = "gold";
    let unselectedColor = "gray";

    colorSelected.addEventListener("input", (event) => {
        selectedColor = colorSelected.value;
    }, false);
    colorUnselected.addEventListener("input", (event) => {
        unselectedColor = colorUnselected.value;
        if (!select5) {
            star5.style.color = unselectedColor;
            if (!select4) {
                star4.style.color = unselectedColor;
                if (!select3) {
                    star3.style.color = unselectedColor;
                    if (!select2) {
                        star2.style.color = unselectedColor;
                        if (!select1) star1.style.color = unselectedColor;
                    }
                }
            }
        }
    }, false);
    star1.addEventListener("mouseover", (event) => {
        event.target.style.color = selectedColor;
    }, false);
    star1.addEventListener("mouseleave", (event) => {
        if (!select1 && !select2 && !select3 && !select4 && !select5) {
            event.target.style.color = unselectedColor;
        }
    }, false);
    star1.addEventListener("click", (event) => {
        if (select1) {
            event.target.style.color = unselectedColor;
            select1 = false;
            ratingMessage.innerHTML = "";
        }
        else {
            event.target.style.color = selectedColor;
            star2.style.color = unselectedColor;
            star3.style.color = unselectedColor;
            star4.style.color = unselectedColor;
            star5.style.color = unselectedColor;
            select1 = true;
            select2 = false;
            select3 = false;
            select4 = false;
            select5 = false;
            ratingMessage.innerHTML = "Thanks for your feedback of 1 star. We'll try to do better!";
        }
        ratingField.value = "1";
        submitForm("1");
    }, false);
    star2.addEventListener("mouseover", (event) => {
        star1.style.color = selectedColor;
        event.target.style.color = selectedColor;
    }, false);
    star2.addEventListener("mouseleave", (event) => {
        if (!select2 && !select3 && !select4 && !select5) {
            if (!select1) star1.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
        }
    }, false);
    star2.addEventListener("click", (event) => {
        if (select2) {
            star1.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
            select2 = false;
            ratingMessage.innerHTML = "";
        }
        else {
            star1.style.color = selectedColor;
            event.target.style.color = selectedColor;
            star3.style.color = unselectedColor;
            star4.style.color = unselectedColor;
            star5.style.color = unselectedColor;
            select2 = true;
            select1 = false;
            select3 = false;
            select4 = false;
            select5 = false;
            ratingMessage.innerHTML = "Thanks for your feedback of 2 stars. We'll try to do better!";
        }
        ratingField.value = "2";
        submitForm("2");
    }, false);
    star3.addEventListener("mouseover", (event) => {
        star1.style.color = selectedColor;
        star2.style.color = selectedColor;
        event.target.style.color = selectedColor;
    }, false);
    star3.addEventListener("mouseleave", (event) => {
        if (!select3 && !select4 && !select5) {
            if (!(select1 || select2)) star1.style.color = unselectedColor;
            if (!select2) star2.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
        }
    }, false);
    star3.addEventListener("click", (event) => {
        if (select3) {
            star1.style.color = unselectedColor;
            star2.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
            select3 = false;
            ratingMessage.innerHTML = "";
        }
        else {
            star1.style.color = selectedColor;
            star2.style.color = selectedColor;
            event.target.style.color = selectedColor;
            star4.style.color = unselectedColor;
            star5.style.color = unselectedColor;
            select3 = true;
            select1 = false;
            select2 = false;
            select4 = false;
            select5 = false;
            ratingMessage.innerHTML = "Thanks for your feedback of 3 stars. We'll try to do better!";
        }
        ratingField.value = "3";
        submitForm("3");
    }, false);
    star4.addEventListener("mouseover", (event) => {
        star1.style.color = selectedColor;
        star2.style.color = selectedColor;
        star3.style.color = selectedColor;
        event.target.style.color = selectedColor;
    }, false);
    star4.addEventListener("mouseleave", (event) => {
        if (!select4 && !select5) {
            if (!(select1 || select2 || select3)) star1.style.color = unselectedColor;
            if (!(select2 || select3)) star2.style.color = unselectedColor;
            if (!select3) star3.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
        }
    }, false);
    star4.addEventListener("click", (event) => {
        if (select4) {
            star1.style.color = unselectedColor;
            star2.style.color = unselectedColor;
            star3.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
            select4 = false;
            ratingMessage.innerHTML = "";
        }
        else {
            star1.style.color = selectedColor;
            star2.style.color = selectedColor;
            star3.style.color = selectedColor;
            event.target.style.color = selectedColor;
            star5.style.color = unselectedColor;
            select4 = true;
            select1 = false;
            select2 = false;
            select3 = false;
            select5 = false;
            ratingMessage.innerHTML = "Thanks for the 4 star rating!";
        }
        ratingField.value = "4";
        submitForm("4");
    }, false);
    star5.addEventListener("mouseover", (event) => {
        star1.style.color = selectedColor;
        star2.style.color = selectedColor;
        star3.style.color = selectedColor;
        star4.style.color = selectedColor;
        event.target.style.color = selectedColor;
    }, false);
    star5.addEventListener("mouseleave", (event) => {
        if (!select5) {
            if (!(select1 || select2 || select3 || select4)) star1.style.color = unselectedColor;
            if (!(select2 || select3 || select4)) star2.style.color = unselectedColor;
            if (!(select3 || select4)) star3.style.color = unselectedColor;
            if (!select4) star4.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
        }
    }, false);
    star5.addEventListener("click", (event) => {
        if (select5) {
            star1.style.color = unselectedColor;
            star2.style.color = unselectedColor;
            star3.style.color = unselectedColor;
            star4.style.color = unselectedColor;
            event.target.style.color = unselectedColor;
            select5 = false;
            ratingMessage.innerHTML = "";
        }
        else {
            star1.style.color = selectedColor;
            star2.style.color = selectedColor;
            star3.style.color = selectedColor;
            star4.style.color = selectedColor;
            event.target.style.color = selectedColor;
            select5 = true;
            select1 = false;
            select2 = false;
            select3 = false;
            select4 = false;
            ratingMessage.innerHTML = "Thanks for the 5 star rating!";
        }
        ratingField.value = "5";
        submitForm("5");
    }, false);
});