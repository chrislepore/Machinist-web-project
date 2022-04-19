const usersBtn = document.getElementById("users-btn");
if(usersBtn) usersBtn.addEventListener('click', getUsers);

const login_to = document.getElementById("login-form");
if(login_to) login_to.addEventListener('submit', login);

const register_to = document.getElementById("register-form");
if(register_to) register_to.addEventListener('submit', register);

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

function register(e){
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const Fname = document.getElementById("fname").value;
  const Lname = document.getElementById("lname").value;
  const pwd = document.getElementById("pwd").value;
  const birth = document.getElementById("birthday").value;
  postData('http://localhost:3000/users/register', {username: uid, password: pwd,  fname: Fname, lname: Lname, birthday: birth})
  .then((data) => {
    if(!data.message){
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`);
  });
}

function login(e){
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const pwd = document.getElementById("pwd").value;
  postData('http://localhost:3000/users/login', {username: uid, password: pwd})
  .then((data) => {
    if(!data.message){
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`);
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
  if(response.ok){
    return await response.json();
  }else{
    throw await response.json();
  }
}

/*
async function fetchData(url = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${url}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}
*/