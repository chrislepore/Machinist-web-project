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
    const d = Object.keys(data);
    for (let index = 0; index < d.length; index++) {
      let item = document.createElement('li');
      item.className = "part";
      item.id = `part-${index}`;
      item.appendChild(document.createTextNode(data[index].name))
      item.href = "/public/parts.html";
      list.appendChild(item);
      document.getElementById(`part-${index}`).addEventListener('click', function(){goToPart(data[index])});
    }
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#login-form p.error").innerHTML = errText;
    console.log(`Error! ${errText}`)
  });
}

function goToPart(part) {
  window.location.href = "parts.html";
  console.log(part);
  localStorage.setItem('part', JSON.stringify(part));
}

let partPro = document.getElementById("par");
if(partPro) partProfile();

function partProfile() {
  let part = JSON.parse(localStorage.getItem('part'));
  let n = document.getElementById("n");
  let m = document.getElementById("m");
  let s = document.getElementById("s");
  let f = document.getElementById("f");
  n.appendChild(document.createTextNode(`${part.name}`));
  m.appendChild(document.createTextNode(`${part.material}`));
  s.appendChild(document.createTextNode(`${part.schematic}`));
  f.appendChild(document.createTextNode(`${part.finishing}`));
  localStorage.removeItem('part');
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