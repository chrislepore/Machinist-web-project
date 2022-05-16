import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'

const loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
  e.preventDefault();

  const name = document.getElementById("uid").value;
  const pswd = document.getElementById("pwd").value;
  fetchData('/users/login', {username: name, password: pswd}, "POST")
  .then((data) => { 
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#login-form p.error").innerHTML = errText;
    document.getElementById("pwd").value = "";
    console.log(`Error! ${errText}`)
  });
}

const regForm = document.getElementById("reg-form");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();

  const name = document.getElementById("uid").value;
  const pswd = document.getElementById("pwd").value;
  const comp = document.getElementById("Company").value;
  const add = document.getElementById("Address").value;

  fetchData('/users/register', {username: name, password: pswd, company: comp, address: add}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#reg-form p.error").innerHTML = errText;
    document.getElementById("pwd").value = "";
    console.log(`Error! ${errText}`)
  });
}

const account_page = document.getElementById("acc");
if(account_page) postAccount();

function postAccount(){
  const user = getCurrentUser();
  let username = document.getElementById("uid");
  let password = document.getElementById("pwd");
  let company = document.getElementById("comp");
  let address = document.getElementById("add");
  username.appendChild(document.createTextNode(`${user.username}`));
  password.appendChild(document.createTextNode(`${user.user_password}`));
  company.appendChild(document.createTextNode(`${user.Company}`));
  address.appendChild(document.createTextNode(`${user.Address}`));
}

const deleteBtn = document.getElementById("delete");
if(deleteBtn) deleteBtn.addEventListener('click', deleteUser);

function deleteUser() {
  const user = getCurrentUser();
  if(confirm("Are you sure you want to delete your account??")){
    fetchData('/users/delete', {userId: user.user_id}, "DELETE")
    .then((data) => {
      if(!data.message) {
        console.log(data.success);
        removeCurrentUser();
        window.location.href = "about.html";
      }
    })
    .catch((error) => {
      const errText = error.message;
      //document.querySelector("#reg-form p.error").innerHTML = errText;
      //document.getElementById("pwd").value = "";
      console.log(`Error! ${errText}`)
    });
  }
}

const editBtn = document.getElementById("edit");
if(editBtn) editBtn.addEventListener('click', editForm);

function editForm() {
  const user = getCurrentUser();
  document.getElementById("acc").innerHTML = `
  <form id="edit-form">
    <p>Edit form here</p>
    <label for="uid">Username/Email:</label>
    <input type="text" id="uid" placeholder="${user.username}">
    <br>
    <label for="Company">Company:</label>
    <input type="text" id="Company" name="Company" placeholder="${user.Company}">
    <label for="Address">Address:</label>
    <input type="text" id="Address" name="Address" placeholder="${user.Address}">
    <br>
    <label for="pwd">Password:</label>
    <input type="password" id="pwd" name="pwd" placeholder="${user.user_password}">
    <br>
    <input type="submit" id="editBtn" class="button"></input>
  </form>
  `;

  document.getElementById("edit-form").addEventListener('submit', editUser);
}

function editUser(e) {
  e.preventDefault();

  const u = getCurrentUser();
  const name = document.getElementById("uid").value;
  const pswd = document.getElementById("pwd").value;
  const comp = document.getElementById("Company").value;
  const add = document.getElementById("Address").value;

  if(!(name && pswd && comp && add)) {confirm("Can't have empty inputs!"); return;}

  fetchData('/users/edit', {username: name, password: pswd, company: comp, address: add, userId: u.user_id}, "PUT")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#edit-form p.error").innerHTML = errText;
    document.getElementById("pwd").value = "";
    console.log(`Error! ${errText}`)
  });
}

