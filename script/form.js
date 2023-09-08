'use strict';

//input
const firstNameEl = document.getElementById("firstName"),
    lastNameEl = document.getElementById("lastName"),
    emailEl = document.getElementById("email"),
    salaryEl = document.getElementById("salary"),
    dateEl = document.getElementById("date"),
    addToHomeBtn = document.getElementById("addToHome"),
    goToHomeBtn = document.getElementById("goToHome")

const overlayContainer = document.getElementById('overlay')
const modelContainer = document.getElementById('model-container')
const contentInDialog = document.getElementById("content")
const closeBtn = document.getElementById('btn-close')
//output

//global variable
let items = localStorage.getItem("employee")
    ? JSON.parse(localStorage.getItem("employee"))
    : [];
let itemToEdit = null;

//function
const init = () => {
    addToHomeBtn.innerText = itemToEdit ? "Update" : "Add"
    close()
}

// error message
const open = () => {
    modelContainer.classList.remove('close')
    modelContainer.classList.add('open')
    overlay.classList.add('overlay')
    contentInDialog.style.display = "block"
}

const close = () => {
    modelContainer.classList.remove('open')
    modelContainer.classList.add('close')
    overlay.classList.remove('overlay')
    contentInDialog.style.display = "none"
}

const nullishValue = () => {
    firstNameEl.value = null
    lastNameEl.value = null
    emailEl.value = null
    salaryEl.value = null
    dateEl.value = null
};

// Check if itemId is defined before attempting to use it.
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

console.log(urlParams)
console.log(itemId)
console.log(parseInt(itemId))

// Load the item's data from localStorage based on itemId if it exists.
if (itemId) {
    itemToEdit = items.find((item) => item.id === parseInt(itemId));
    if (itemToEdit) {
        // Populate the form fields with the data of the item being edited.
        firstNameEl.value = itemToEdit.firstName;
        lastNameEl.value = itemToEdit.lastName;
        emailEl.value = itemToEdit.email;
        salaryEl.value = itemToEdit.salary;
        dateEl.value = itemToEdit.date;
    }
}

console.log(itemToEdit)

//event
addToHomeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const firstName = firstNameEl.value;
    const lastName = lastNameEl.value;
    const email = emailEl.value;
    const salary = salaryEl.value;
    const date = dateEl.value;

    if (firstName && lastName && email && salary && date) {
        if (itemToEdit) {
            // You are editing an existing item instead of creating a new one..
                items = items.map((item) => {
                    if (item.id === parseInt(itemId)) {
                        return {
                            ...item,
                            firstName,
                            lastName,
                            email,
                            salary,
                            date,
                        };
                    }
                    return item;
            });
            localStorage.setItem("updatedDialog", true)
            // Store the updated items array in localStorage.
            localStorage.setItem("employee", JSON.stringify(items));
            nullishValue();

            // Redirect to the home page.
            window.location.href = "/component/home.html";
        } else {
            // You are creating a new item here.
            const newItems = {
                id: Date.now(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                salary: salary,
                date: date,
            };

            // Push the new item to the items array.
            items.push(newItems);
            // Store the updated items array in localStorage.
            localStorage.setItem("employee", JSON.stringify(items));
            nullishValue();

            // Redirect to the home page.
            window.location.href = "/component/home.html";
        }
    } else {
        open()
    }
})

closeBtn.addEventListener("click", () => {
    close()
})

if (localStorage.getItem("isLoggedIn") === "false") {
    window.location.href = "/"
}

//initial settings
init()