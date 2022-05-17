import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'


let partList = document.getElementById("PARTS_list");
if(partList) showUserParts();


function showUserParts() {

  const user = getCurrentUser();
  const list = document.getElementById("P_list");
  fetchData('/parts/userParts', {userId: user.user_id}, "POST")
  .then((data) => { 
    //list.appendChild(document.createTextNode(data[0].name));
    //data.forEach(element => list.appendChild(document.createTextNode(element.name)));

    data.forEach((part) => {
      let item = document.createElement('il');
      item.className = "part";
      item.appendChild(document.createTextNode(part.name))
      list.appendChild(item);
    });
      
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#login-form p.error").innerHTML = errText;
    console.log(`Error! ${errText}`)
  });
}

let partForm = document.getElementById("part-form");
if(partForm) partForm.addEventListener('submit', createPart);

function createPart(e) {
  e.preventDefault();

  const user = getCurrentUser();
  const n = document.getElementById("name").value;
  const m = document.getElementById("material").value;
  const s = document.getElementById("schematic").value;
  const f = document.getElementById("finishing").value;

  if(!(n && m && s && f)) {confirm("Can't have empty inputs!"); return;}

  fetchData('/parts/createPart', {name: n, material: m, schematic: s, finishing: f, userId: user.user_id}, "POST")
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