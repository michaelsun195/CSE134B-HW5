const getInit = {
    method: "GET",
};

const weatherRequest = new Request("https://api.weather.gov/gridpoints/SGX/55,21/forecast", getInit);
fetch(weatherRequest)
    .then(async (response) => {
        let test = await new Response(response.body).json();
        document.getElementById("forecast").innerHTML = test["properties"]["periods"][0]["shortForecast"];
        document.getElementById("temperature").innerHTML = test["properties"]["periods"][0]["temperature"];
        document.getElementById("temp-units").innerHTML = test["properties"]["periods"][0]["temperatureUnit"];
        document.getElementById("wind-speed").innerHTML = test["properties"]["periods"][0]["windSpeed"];
        document.getElementById("wind-dir").innerHTML = test["properties"]["periods"][0]["windDirection"];
        document.getElementById("humidity").innerHTML = test["properties"]["periods"][0]["relativeHumidity"]["value"];
        let currWeather = test["properties"]["periods"][0]["icon"].replace("https://api.weather.gov/icons/land/","").replace("?size=medium","");
        let tags = currWeather.split("/");
        switch (tags[1]) {
            case "wind_skc":
            case "wind_few":
            case "wind_sct":
            case "wind_bkn":
            case "wind_ovc":
                document.getElementById("weather-icon").setAttribute("srcset", "assets/" + tags[1].substring(5) + tags[0] + ".png");
                break;
            case "rain_snow":
            case "rain_sleet":
            case "snow_sleet":
            case "rain_fzra":
            case "snow_fzra":
            case "rain_showers":
            case "rain_showers_hi":
            case "tsra_sct":
            case "tsra_hi":
                document.getElementById("weather-icon").setAttribute("srcset", "assets/" + tags[1].substring(0,4) + tags[0] + ".png");
                break;
            case "tropical_storm":
            case "hurricane":
            case "haze":
            case "hot":
            case "cold":
                document.getElementById("weather-icon").setAttribute("srcset", "assets/" + tags[1] + ".png");
                break;
            default:
                document.getElementById("weather-icon").setAttribute("srcset", "assets/" + tags[1] + tags[0] + ".png");
        }
        document.getElementById("forecast-block").style.display = "block";
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
    const symbolSelect = document.getElementById("symbol-select");
    let select1 = false;
    let select2 = false;
    let select3 = false;
    let select4 = false;
    let select5 = false;
    let selectedColor = "gold";
    let unselectedColor = "gray";

    symbolSelect.addEventListener("input", (event) => {
        if (symbolSelect.value === "star") {
            star1.innerHTML = "&#9733;";
            star2.innerHTML = "&#9733;";
            star3.innerHTML = "&#9733;";
            star4.innerHTML = "&#9733;";
            star5.innerHTML = "&#9733;";
        }
        else {
            star1.innerHTML = "&#10084;";
            star2.innerHTML = "&#10084;";
            star3.innerHTML = "&#10084;";
            star4.innerHTML = "&#10084;";
            star5.innerHTML = "&#10084;";
        }
    }, false);
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