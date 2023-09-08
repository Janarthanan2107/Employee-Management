'use strict';

//inputs
const body = document.getElementById("body")
const deleteOverlayContainer = document.getElementById("deleteOverlay")
const updateOverlayContainer = document.getElementById("updateOverlay")

// while login
const overlayContainer = document.getElementById('successOverlay')

//logout
const logoutContainer = document.getElementById('logOutOverlay')

//models
const modelContainer = document.getElementById('model-container')
const closeBtn = document.getElementById('btn-close')
const logoutBtn = document.getElementById("logout")
const logoutSession = document.getElementById("logoutSession")
//outputs

//global variable
let items = localStorage.getItem("employee")
    ? JSON.parse(localStorage.getItem("employee"))
    : [];
let isEditing;
let itemToEdit;

//functions
const init = () => {
    // existing data or upcoming data displayed here
    getData(items)
}

const tableBodyTemp = (item, index) => {
    if (item) { // Check if item is not null
        const { id, firstName, lastName, email, salary, date } = item;
        console.log(item);
        const rowList = document.createElement("tr");
        rowList.innerHTML = `
            <td>${index + 1}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>₹${salary}</td>
            <td>${date}</td>
            <td class="text-right"><button type="button" onClick="editRow(${id})">Edit</button></td>
            <td class="text-left"><button type="button" onclick="deleteRowDialog(${id})">Delete</button></td>
        `;
        body.appendChild(rowList);
    }
}

const editRow = (id) => {
    // Redirect to form.html with the item's ID as a URL parameter
    window.location.href = `./form.html?id=${id}`;
    localStorage.setItem("updatedDialog", false)
}


const deleteRowDialog = (id) => {
    const overlay = document.createElement("div")
    overlay.classList.add("overlay")
    overlay.innerHTML = `
    <div class="model-container" id="model-container">
        <div class="" id="content">
            <i class="fa-solid fa-exclamation"></i>
            <h3 class="successfull">Are you sure?</h3>
            <p>You won't be able to revert this!</p>
            <div>
            <button class="close-btn" id="deleteItem">Yes, delete it!</button>
            <button class="cancelBtn" id="deleteClose">No, cancel</button>
            </div>
        </div>
    </div>`
    deleteOverlayContainer.appendChild(overlay)
    const deleteItemBtn = document.getElementById("deleteItem")
    const deleteCloseBtn = document.getElementById("deleteClose")
    deleteItemBtn.addEventListener("click", () => {
        deleteRow(id)
        deleteOverlayContainer.innerHTML = ""
    })
 
    deleteCloseBtn.addEventListener("click", () => {
        deleteOverlayContainer.innerHTML = ""
    })
}

const updatedDialogTemplate = (msg) => {
    const overlay = document.createElement("div")
    overlay.classList.add("overlay")
    overlay.innerHTML = `
    <div class="model-container" id="model-container">
        <div class="" id="content">
            <i class="fa-solid fa-check"></i>
            <h3 class="successfull">Updated Successfully</h3>
        </div>
    </div>`
    updateOverlayContainer.appendChild(overlay)
}

const getData = (items) => {
    body.innerHTML = items.length === 0 ? `<p class="listMsg">No records found!</p>` : ""

    items.forEach((element, index) => {
        tableBodyTemp(element, index)
        // console.log(element)
    });
}

const deleteRow = (id) => {
    items = items.filter((item) => item.id !== id)
    console.log(items)
    getData(items)
    localStorage.setItem("employee", JSON.stringify(items));
}

const successDialogTemplate = (msg) => {
    const overlay = document.createElement("div")
    overlay.classList.add("overlay")
    overlay.innerHTML = `
    <div class="model-container" id="model-container">
        <div class="" id="content">
            <i class="fa-solid fa-check"></i>
            <h3 class="successfull">Successfully Logged In!</h3>
        </div>
    </div>`
    overlayContainer.appendChild(overlay)
} 

const logOutDialogTemplate = (msg) => {
    const overlay = document.createElement("div")
    overlay.classList.add("overlay")
    overlay.innerHTML = `
    <div class="model-container" id="model-container">
        <div class="" id="content">
            <i class="fa-solid fa-question"></i>
            <h3 class="successfull">Logging Out</h3>
            <p>Are your sure you want to log out?</p>
            <div>
            <button class="close-btn" id="logoutSession">Yes</button>
            <button class="cancelBtn" id="logoutSessionClose">Cancel</button>
            </div>
        </div>
    </div>`
    logoutContainer.appendChild(overlay)
    const logoutSessionBtn = document.getElementById("logoutSession")
    const logoutSessionCloseBtn = document.getElementById("logoutSessionClose")
    logoutSessionBtn.addEventListener("click", () => {
        localStorage.setItem("isLoggedIn", false)
        window.location.href = "/index.html"
    })

    logoutSessionCloseBtn.addEventListener("click", () => {
        logoutContainer.innerHTML = ""
    })
}

//events
logoutBtn.addEventListener("click", () => {
    logOutDialogTemplate()
})

if (localStorage.getItem("isLoggedIn") === "false") {
    window.location.href = "/"
}

if (localStorage.getItem("loggedInDialog") === "true") {
    successDialogTemplate()
}

setTimeout(() => {
    localStorage.setItem("loggedInDialog", false)
    overlayContainer.innerHTML = ""
}, 2000);

if (localStorage.getItem("updatedDialog") === "true") {
    updatedDialogTemplate()
}

setTimeout(() => {
    localStorage.setItem("updatedDialog", false)
    updateOverlayContainer.innerHTML = ""
}, 2000);

//     localStorage.setItem("isLoggedIn", false)

//initial settings
init()