import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, query, where, Timestamp, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


let arr = [];
let userUid;

// user checking access
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    userUid = uid
    const q = query(collection(db, 'todos'), where('uid', "==", uid), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), docId: doc.id });
    });
    renderTodo()
  } else {
    window.location = "login.html"
  }
})

const logout = document.querySelector('#logout');
const add = document.querySelector('.btn');
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const desc = document.querySelector('#description');
const div = document.querySelector('.tasks');

function renderTodo() {
  div.innerHTML = ''

  console.log(arr)

  // rendering todos
  arr.map((item) => {
    div.innerHTML += `
    <div class="tas">
    <div class="tasTex">
        <h3>Title: ${item.title}</h3>
        <span>Description: ${item.description}</span>
    </div>
    <div class="del" id="deleteBtn">
        <i class="material-icons">delete</i>
    </div>
    <div class="del" id="updateBtn">
        <i class="fa fa-edit" style="font-size: 22px;"></i>
    </div>
   </div>
   </div>
    `
  });

  // delete todo
const deleteBtn = document.querySelectorAll('#deleteBtn')
deleteBtn.forEach((item,index) =>{
  item.addEventListener('click' , ()=>{
    deleteTodo(index);
  })
})

// update todo
const updateBtn = document.querySelectorAll('#updateBtn');
updateBtn.forEach((item, index) => {
  item.addEventListener('click', () => {
    console.log('update called', index);
    updateTodo(index);
  })
})

}


// adding todos
form.addEventListener('submit' , async (event)=>{
event.preventDefault()

try {
  const docRef = await addDoc(collection(db , "todos"),{
    title: title.value,
    description: desc.value,
    uid: auth.currentUser.uid,
    timestamp: Timestamp.fromDate(new Date()),
  })
  console.log(docRef.id);
  arr.unshift({
    title: title.value,
    description: desc.value,
    uid: userUid,
    docId:docRef.id
  })
  renderTodo()
} catch (error) {
  console.error(error);
}
})

// delete todo
function deleteTodo(index) {
  const todosRef = doc(db, "todos", arr[index].docId)
  deleteDoc(todosRef)
  .then(() =>{
    arr.splice(index,1)
    renderTodo()
  }).catch((e) =>{
    console.log(e);
  })
}

// update todo
function updateTodo(index) {
  const title = prompt("update your title")
  const description = prompt("update your description")
  const todosRef = doc(db, "todos", arr[index].docId)

  updateDoc(todosRef, {
    title: title,
    description: description
  }).then(()=>{
    arr[index].title = title
    arr[index].description = description
    renderTodo()
  }).catch((e) =>{
    console.log(e);
  })
  
  renderTodo()
}


// logout function

logout.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = 'login.html'
  }).catch((error) => {
    console.log(error);
  });
})