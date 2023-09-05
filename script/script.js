'use strict';

//inputs
const email = document.getElementById('email');
const password = document.getElementById('password');
const link = document.getElementById('homeLink');
const button = document.getElementById('loginButton');
const overlayContainer = document.getElementById('overlay')
const modelContainer = document.getElementById('model-container')
const closeBtn = document.getElementById('btn-close')

const contentInDialog = document.getElementById("content")
const loader = document.getElementById("loader")
//outputs


//global variable

//functions
const init = () => {
    close()
}

const open = () => {
    modelContainer.classList.remove('close')
    modelContainer.classList.add('open')
    overlay.classList.add('overlay')
    loader.classList.remove('open')
    loader.classList.add('close')
    contentInDialog.style.display="block"
}

const close = () => {
    modelContainer.classList.remove('open')
    modelContainer.classList.add('close')
    overlay.classList.remove('overlay')
    loader.classList.remove('open')
    loader.classList.add('close')
    contentInDialog.style.display="none"
}

const openLoader = () => {
    modelContainer.classList.remove('close')
    modelContainer.classList.add('open')
    overlay.classList.add('overlay')
    loader.classList.remove('close')
    loader.classList.add('open')
    contentInDialog.style.display="none"
}

const closeLoader = () => {
    loader.classList.remove('open')
    loader.classList.add('close')
}

//events
// Add a click event listener to the button
button.addEventListener('click', () => {
    // href="component/home.html"
    if (email.value == "admin@example.com" && password.value == "qwerty") {
        link.href = "component/home.html"
    } else {
        openLoader()
        setTimeout(() => {
            open()
        }, 2000);
    }
});

closeBtn.addEventListener("click", () => {
    close()
})

//initial settings
init();
