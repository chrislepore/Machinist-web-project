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
  //localStorage.removeItem('part');
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

const editBtn = document.getElementById("editPart");
if(editBtn) editBtn.addEventListener('click', editForm);

function editForm() {
  const part = JSON.parse(localStorage.getItem('part'));
  document.getElementById("par").innerHTML = `
  <form id="edit-form-part">
    <p>Edit form here</p>
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="${part.name}">
    <br>
    <label for="material">Material:</label>
    <input type="text" id="material" name="material" placeholder="${part.material}">
    <label for="schematic">Schematic:</label>
    <input type="text" id="schematic" name="schematic" placeholder="${part.schematic}">
    <br>
    <label for="finishing">Finishing:</label>
    <input type="text" id="finishing" name="finishing" placeholder="${part.finishing}">
    <br>
    <input type="submit" id="editBtn" class="button"></input>
  </form>
  `;

  document.getElementById("edit-form-part").addEventListener('submit', editPart);
}


function editPart(e) {
  e.preventDefault();

  const part = JSON.parse(localStorage.getItem('part'));
  const na = document.getElementById("name").value;
  const mat = document.getElementById("material").value;
  const sch = document.getElementById("schematic").value;
  const fin = document.getElementById("finishing").value;

  if(!(na && mat && sch && fin)) {confirm("Can't have empty inputs!"); return;}

  fetchData('/parts/edit', {name: na, material: mat, schematic: sch, finishing: fin, partId: part.part_id, userId: part.user_id}, "PUT")
  .then((data) => {
    if(!data.message) {
      localStorage.setItem('part', JSON.stringify(data));
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector("#edit-form p.error").innerHTML = errText;
    console.log(`Error! ${errText}`)
  });
}