const time = document.getElementById("timer")
const date = document.getElementById("date")
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

    new_hour = ampm == "PM" ? String(now.getHours() - 12).padStart(2,"0") : String(now.getHours()).padStart(2,"0")
    new_minute = String(now.getMinutes()).padStart(2,"0")
    new_second = String(now.getSeconds()).padStart(2,"0")

    time.textContent = `${new_hour}:${new_minute}:${new_second} ${ampm}`
    date.textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
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

dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("notebook"))
dragElement(document.getElementById("calc"));
dragElement(document.getElementById("weather"));


function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

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

function handleEmoji(num){
  if (num < 0){
    return `Freezing `
  }
  else if (num < 10){
    return `Cold`
  }
  else if (num < 18){
    return `Cool`
  }
  else if (num < 24){
    return `Mid/ Comfortable`
  }
  else if (num < 30){
    return `Warm`
  }
  else if(num < 38){
    return `Hot`
  }
  else{
    return `Extreme hot`
  }
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
            <h1>${location.name}</h1>
            <h2>${Math.round(weather.temperature_2m)}°C</h2>
            <h3>${handleEmoji(Math.round(weather.temperature_2m))}</h3>
        `;
    } catch (error) {
        result.innerHTML = `<img style="height: 150px; width: 40%;" src="images/no-result.gif" alt="welcome">
                            <p style="font-size: 20px;">Try searching for other cities</p>
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

