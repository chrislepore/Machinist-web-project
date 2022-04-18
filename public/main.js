const usersBtn = document.getElementById("users-btn");
usersBtn.addEventListener('click', getUsers);

const login_to = document.getElementById("loging-in");
login_to.addEventListener('click', login(login_to));

function getUsers() {
  fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((data) => {
    let ul = document.getElementById("allUsers");
    data.forEach((user) => {
      let li = document.createElement('li');
      let text = document.createTextNode(user.userName);
      li.appendChild(text);
      ul.appendChild(li);
    })
    console.log(data);
  })
  .catch((err) => console.log(`Error! ${err}`));
}

function login(e){
  e.preventDefault();

  const uid = document.getElementsById("uid").value;
  const pwd = document.getElementsById("pwd").value;
  postData('http://localhost:3000/users/login', {username: uid, password: pwd})
  .then((data) => {
    if(!data.message){
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  });
}

async function postData(url = '', data = {}){
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  if(responce.ok){
    return await response.json();
  }else{
    throw await response.json();
  }
}