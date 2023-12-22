import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js'

const form = document.querySelector('form');
const email1 = document.querySelector('#email');
const password1 = document.querySelector('#password');
const logbtn = document.querySelector('#login');
const eror = document.querySelector('#maineror');
const userName = document.querySelector('#name');


form.addEventListener('submit', (event) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email1.value, password1.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    name: userName.value,
                    email: email1.value,
                    uid: user.uid
                })
                console.log("Document written with ID: ", docRef.id);
                window.location = 'login.html'

            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            eror.innerHTML = errorCode
        });
})

logbtn.addEventListener('click', (event) => {
    event.preventDefault()
    window.location = 'login.html'
})


let show = document.querySelector('.inp span')
let password = document.getElementById("password")
let img = document.querySelector('img')



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


//firebase storage

const file = document.querySelector('#file');
const btn1 = document.querySelector('#file-btn');

btn1.addEventListener('click', () => {
    const files = file.files[0];
    console.log(files);
    const storageRef = ref(storage, email1.value);
    uploadBytes(storageRef, files).then(() => {
        getDownloadURL(storageRef).then((url) => {
            console.log(url);
        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    })
})
 
