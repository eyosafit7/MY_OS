const time = document.getElementById("timer")
var welcomescreen = document.querySelector("#welcome")

var welcomescreenclose = document.querySelector("#welcomeclose")
var welcomescreenopen = document.querySelector("#welcomeopen")
var calcopen = document.querySelector("#calculator_app")
var calclose = document.querySelector("#calclose")
var noteopen = document.querySelector("#notebook_app")
var noteclose = document.querySelector("#notebookclose")
var weatheropen = document.querySelector("#weather_app")
var weatherclose = document.querySelector("#weatherclose")


var calc = document.getElementById("calc")
var weather = document.getElementById("weather")
var monitorvalue = document.getElementById("monitorvalue")
var notebook = document.getElementById("notebook")

var bigger_index = 1

function addValue(val){
  monitorvalue.value += val
}

function remove(){
  monitorvalue.value = ""
}
function deletelast(){
  monitorvalue.value = monitorvalue.value.slice(0,-1)
}
function solve(){
  monitorvalue.value = eval(monitorvalue.value)
}

function count(){
    const now = new Date()

    ampm = now.getHours()
    ampm = ampm > 12 ? "PM" : "AM"

    new_hour = ampm == "PM" ? String(now.getHours()).padStart(2,"0") - 12 : String(now.getHours()).padStart(2,"0")
    new_minute = String(now.getMinutes()).padStart(2,"0")
    new_second = String(now.getSeconds()).padStart(2,"0")

    time.textContent = `${new_hour}:${new_minute}:${new_second} ${ampm}`
}

function close_window(element){
    element.style.display = "none"
}

function open_window(element){
  if (element.style.display != "none"){
    close_window(element)
  }
  else{
    element.style.zIndex = `${bigger_index}`
    bigger_index += 1
    element.style.display = "inline-block"
  }
  
}

welcomescreenopen.addEventListener("click",function(){
    open_window(welcomescreen)
})

welcomescreenclose.addEventListener("click",function(){
    close_window(welcomescreen)
})
calcopen.addEventListener("click",function(){
    open_window(calc)
})

calclose.addEventListener("click",function(){
    close_window(calc)
})
noteopen.addEventListener("click",function(){
    open_window(notebook)
})

noteclose.addEventListener("click",function(){
    close_window(notebook)
})
weatheropen.addEventListener("click",function(){
    open_window(weather)
})

weatherclose.addEventListener("click",function(){
    close_window(weather)
})


count()

setInterval(count,1000)

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("notebook"))
dragElement(document.getElementById("calc"));
dragElement(document.getElementById("weather"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const Arbaminch = document.getElementById("Arba Minch")
const AddisAbaba = document.getElementById("Addis Ababa")
const London = document.getElementById("London")
const Tokyo = document.getElementById("Tokyo")
const Paris = document.getElementById("Paris")
const NewYork = document.getElementById("NewYork")
const searched = document.getElementById("search_weather")
const update = document.getElementById("update")
const result = document.getElementById("weather_result")


const conditions = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Fog 🌫️",
    51: "Light drizzle 🌦️",
    53: "Drizzle 🌦️",
    55: "Heavy drizzle 🌧️",
    61: "Light rain 🌧️",
    63: "Moderate rain 🌧️",
    65: "Heavy rain 🌧️",
    71: "Light snow 🌨️",
    73: "Snow 🌨️",
    75: "Heavy snow ❄️",
    80: "Rain showers 🌦️",
    81: "Rain showers 🌧️",
    82: "Heavy rain showers 🌧️",
    95: "Thunderstorm ⛈️",
    96: "Thunderstorm with hail ⛈️",
    99: "Severe thunderstorm ⛈️"
}
function handleWeatherClick(elem,val){
  
  elem.addEventListener("click", async () => {
    const city = typeof val !== "string"
            ? val.value.trim()
            : val.trim();
    result.innerHTML = "<p>Loading weather...</p>";
    elem.disabled = true
    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        )
        if (!geoResponse.ok) {
            throw new Error("Could not find the city.");}
        
        const geoData = await geoResponse.json();
        const location = geoData.results?.[0]
        if (!location) {
            throw new Error("City not found.");}
        
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`
        )
        if (!response.ok) {
            throw new Error("Could not fetch weather data.");}
        
        const data = await response.json();
        const weather = data.current
        result.innerHTML = `
            <h2>${location.name}</h2>
            <h1>${Math.round(weather.temperature_2m)}°C</h1>
            <p>${conditions[weather.weather_code] ?? "Unknown conditions"}</p>
            <p>Feels like: ${weather.apparent_temperature}°C</p>
            <p>Humidity: ${weather.relative_humidity_2m}%</p>
            <p>Wind: ${weather.wind_speed_10m} km/h</p>
            <p>Precipitation: ${weather.precipitation} mm</p>
            <small>Updated: ${weather.time.replace("T", " ")}</small>
        `;
    } catch (error) {
        result.innerHTML = `<img style="height: 250px; width: 350px;" src="images/weatherwelcome.gif" alt="welcome">
                            `;
    } finally {
        elem.disabled = false;
    }
});

}

handleWeatherClick(Arbaminch,Arbaminch.id)
handleWeatherClick(AddisAbaba,AddisAbaba.id)
handleWeatherClick(Paris,Paris.id)
handleWeatherClick(NewYork,NewYork.id)
handleWeatherClick(London,London.id)
handleWeatherClick(Tokyo,Tokyo.id)
handleWeatherClick(update,searched)

