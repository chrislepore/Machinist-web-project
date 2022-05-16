import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'


//let partList = document.getElementsByClassName("PARTS_list");
//if(partList) showUserParts();

/*
function showUserParts(e) {
  e.preventDefault();
  
  const u = getCurrentUser();
  const list = document.getElementById("P_list");
  fetchData('/parts/UserParts', {user: u}, "POST")
  .then((data) => { 
      data.forEach(part => {
          let li = document.createElement('li');
          li.appendChild(document.createTextNode(part.name));
          list.appendChild(li);
      })
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#login-form p.error").innerHTML = errText;
    console.log(`Error! ${errText}`)
  });
}
*/

let partForm = document.getElementById("part-form");
if(partForm) partForm.addEventListener('submit', createPart);

function createPart(e) {
  e.preventDefault();

  const u = getCurrentUser();
  const n = document.getElementById("name").value;
  const m = document.getElementById("material").value;
  const s = document.getElementById("schematic").value;
  const f = document.getElementById("finishing").value;

  if(!(n && m && s && f)) {confirm("Can't have empty inputs!"); return;}

  fetchData('/parts/createPart', {name: n, material: m, schematic: s, finishing: f, userId: u.user_id}, "POST")
  .then((data) => {
    if(!data.message) {
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#edit-form p.error").innerHTML = errText;
    //document.getElementById("pwd").value = "";
    console.log(`Error! ${errText}`)
  });
}