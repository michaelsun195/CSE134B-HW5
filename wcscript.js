const myInit = {
    method: "GET",
};
const weatherRequest = new Request("https://api.weather.gov/gridpoints/SGX/55,21/forecast", myInit);
fetch(weatherRequest)
    .then(async (response) => {
        let test = await new Response(response.body).json();
        console.log(test);
        document.getElementById("forecast").innerHTML = test["properties"]["periods"][0]["shortForecast"];
        document.getElementById("temperature").innerHTML = test["properties"]["periods"][0]["temperature"];
    });

document.addEventListener("DOMContentLoaded", function () {
    const star1 = document.getElementById("1-empty");
    const star2 = document.getElementById("2-empty");
    const star3 = document.getElementById("3-empty");
    const star4 = document.getElementById("4-empty");
    const star5 = document.getElementById("5-empty");
    const ratingField = document.getElementById("rating-field");
    const ratingJS = document.getElementById("rating-js");
    let select1 = false;
    let select2 = false;
    let select3 = false;
    let select4 = false;
    let select5 = false;

    star1.addEventListener("mouseover", (event) => {
        event.target.style.color = "gold";
    }, false);
    star1.addEventListener("mouseleave", (event) => {
        if (!select1 && !select2 && !select3 && !select4 && !select5) {
            event.target.style.color = "gray";
        }
    }, false);
    star1.addEventListener("click", (event) => {
        if (select1) {
            event.target.style.color = "gray";
            select1 = false;
        }
        else {
            event.target.style.color = "gold";
            select1 = true;
            select2 = false;
            select3 = false;
            select4 = false;
            select5 = false;
        }
        ratingField.value = "1";
        ratingJS.submit();
    }, false);
    star2.addEventListener("mouseover", (event) => {
        star1.style.color = "gold";
        event.target.style.color = "gold";
    }, false);
    star2.addEventListener("mouseleave", (event) => {
        if (!select2 && !select3 && !select4 && !select5) {
            star1.style.color = "gray";
            event.target.style.color = "gray";
        }
    }, false);
    star2.addEventListener("click", (event) => {
        if (select2) {
            star1.style.color = "gray";
            event.target.style.color = "gray";
            select2 = false;
        }
        else {
            star1.style.color = "gold";
            event.target.style.color = "gold";
            select2 = true;
            select1 = false;
            select3 = false;
            select4 = false;
            select5 = false;
        }
        ratingField.value = "2";
        ratingJS.submit();
    }, false);
    star3.addEventListener("mouseover", (event) => {
        star1.style.color = "gold";
        star2.style.color = "gold";
        event.target.style.color = "gold";
    }, false);
    star3.addEventListener("mouseleave", (event) => {
        if (!select3 && !select4 && !select5) {
            star1.style.color = "gray";
            star2.style.color = "gray";
            event.target.style.color = "gray";
        }
    }, false);
    star3.addEventListener("click", (event) => {
        if (select3) {
            star1.style.color = "gray";
            star2.style.color = "gray";
            event.target.style.color = "gray";
            select3 = false;
        }
        else {
            star1.style.color = "gold";
            star2.style.color = "gold";
            event.target.style.color = "gold";
            select3 = true;
            select1 = false;
            select2 = false;
            select4 = false;
            select5 = false;
        }
        ratingField.value = "3";
        ratingJS.submit();
    }, false);
    star4.addEventListener("mouseover", (event) => {
        star1.style.color = "gold";
        star2.style.color = "gold";
        star3.style.color = "gold";
        event.target.style.color = "gold";
    }, false);
    star4.addEventListener("mouseleave", (event) => {
        if (!select4 && !select5) {
            star1.style.color = "gray";
            star2.style.color = "gray";
            star3.style.color = "gray";
            event.target.style.color = "gray";
        }
    }, false);
    star4.addEventListener("click", (event) => {
        if (select4) {
            star1.style.color = "gray";
            star2.style.color = "gray";
            star3.style.color = "gray";
            event.target.style.color = "gray";
            select4 = false;
        }
        else {
            star1.style.color = "gold";
            star2.style.color = "gold";
            star3.style.color = "gold";
            event.target.style.color = "gold";
            select4 = true;
            select1 = false;
            select2 = false;
            select3 = false;
            select5 = false;
        }
        ratingField.value = "4";
        ratingJS.submit();
    }, false);
    star5.addEventListener("mouseover", (event) => {
        star1.style.color = "gold";
        star2.style.color = "gold";
        star3.style.color = "gold";
        star4.style.color = "gold";
        event.target.style.color = "gold";
    }, false);
    star5.addEventListener("mouseleave", (event) => {
        if (!select5) {
            star1.style.color = "gray";
            star2.style.color = "gray";
            star3.style.color = "gray";
            star4.style.color = "gray";
            event.target.style.color = "gray";
        }
    }, false);
    star5.addEventListener("click", (event) => {
        if (select5) {
            star1.style.color = "gray";
            star2.style.color = "gray";
            star3.style.color = "gray";
            star4.style.color = "gray";
            event.target.style.color = "gray";
            select5 = false;
        }
        else {
            star1.style.color = "gold";
            star2.style.color = "gold";
            star3.style.color = "gold";
            star4.style.color = "gold";
            event.target.style.color = "gold";
            select5 = true;
            select1 = false;
            select2 = false;
            select3 = false;
            select4 = false;
        }
        ratingField.value = "5";
        ratingJS.submit();
    }, false);
});