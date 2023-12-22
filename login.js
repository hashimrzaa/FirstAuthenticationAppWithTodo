import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector('form');
const email1 = document.querySelector('#email');
const password1 = document.querySelector('#password');
const logout = document.querySelector('#logout');
const eror = document.querySelector('#maineror');

let show = document.querySelector('.inp span')
let password = document.getElementById("password")
let img = document.querySelector('img')


form.addEventListener('submit', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email1.value, password1.value)
        .then((userCredential) => {
            const user = userCredential.user
            window.location = 'home.html'

        }).catch((error) => {
            const errorCode = error.code
            eror.innerHTML = errorCode
        })
})
logout.addEventListener('click', (e) => {
    e.preventDefault()
    window.location = 'index.html'
})


password.addEventListener('input', function () {
    if (password.value.length === 0) {
        img.classList.add('hide')
    } else {
        img.classList.remove('hide')
    }
})

show.addEventListener('click', function () {
    if (password.type === "password") {
        img.src = "show.png"
        password.type = "text"
    } else {
        password.type = "password"
        img.src = "hide.png"
    }
    show.addEventListener('mouseleave', function () {
        password.type = "password"
        img.src = "hide.png"
    })
})

document.addEventListener('keydown', function (event) {
    const key = event.key
    if (key === 'Shift') {
        password.type = "text"
        img.src = "show.png"
    }
    document.addEventListener('keyup', function (event) {
        const key = event.key
        if (key === 'Shift') {
            password.type = "password"
            img.src = "hide.png"
        }
    })
})