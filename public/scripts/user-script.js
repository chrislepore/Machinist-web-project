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
