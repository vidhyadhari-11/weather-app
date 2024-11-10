
const weatherform = document.querySelector(".weatherform");  //this will give first element in the class
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "458d36d579fe7488d95c14b0b90bfd20";

weatherform.addEventListener("submit", async event => {

    event.preventDefault(); //to not to refresh the page

    const city = cityinput.value;

    if (city) {
        try {

            const weatherdata = await getweatherdata(city); //we will wait for the getweatherdata() to get the data and then move to next step
            displayweatherinfo(weatherdata);
        }
        catch (error) {
            console.log(error);
            displayerror(error);
        }
    }
    else {
        displayerror("please enter a city");
    }

});

async function getweatherdata(city) {

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayweatherinfo(data) {

    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");


    citydisplay.textContent = city;
    // tempdisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatheremoji.textContent = getweatheremoji(id);

    citydisplay.classList.add("citydispplay");
    tempdisplay.classList.add("tempdispplay");
    humiditydisplay.classList.add("humiditydispplay");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid) {

    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈";
        case (weatherid >= 300 && weatherid < 400):
            return "⛈";
        case (weatherid >= 500 && weatherid < 600):
            return "⛈";
        case (weatherid >= 600 && weatherid < 700):
            return "❄";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫";
        case (weatherid === 800):
            return "☀";
        case (weatherid >= 801 && weatherid < 810):
            return "☁";
        default:
            return "?";

    }

}

function displayerror(msg) {

    const errordisplay = document.createElement("p");
    errordisplay.textContent = msg;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}