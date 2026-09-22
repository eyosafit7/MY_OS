const time = document.getElementById("timer")

function count(){
    const now = new Date()

    ampm = now.getHours()
    ampm = ampm > 12 ? "PM" : "AM"

    new_hour = ampm == "PM" ? String(now.getHours()).padStart(2,"0") - 12 : String(now.getHours()).padStart(2,"0")
    new_minute = String(now.getMinutes()).padStart(2,"0")
    new_second = String(now.getSeconds()).padStart(2,"0")

    time.textContent = `${new_hour}:${new_minute}:${new_second} ${ampm}`
}

count()

setInterval(count,1000)