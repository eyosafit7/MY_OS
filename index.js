const time = document.getElementById("timer")
var welcomescreen = document.querySelector("#welcome")

var welcomescreenclose = document.querySelector("#welcomeclose")
var welcomescreenopen = document.querySelector("#welcomeopen")



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
    element.style.display = "inline-block"
}

welcomescreenopen.addEventListener("click",function(){
    open_window(welcomescreen)
})

welcomescreenclose.addEventListener("click",function(){
    close_window(welcomescreen)
})

count()

setInterval(count,1000)

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

dragElement(document.getElementById("mydiv"));

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