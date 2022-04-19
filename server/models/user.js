const users = [
    {
    userId: 1,
    userName: "chris123",
    password: "Bailey",
    firstName: "mik",
    lastName: "lep",
    Birthday: "2/4/21",
    },
    {
    userId: 2,
    userName: "fredburger54",
    password: "Badf",
    firstName: "hi",
    lastName: "lol",
    Birthday: "1/6/12",
    }
];

let getUsers = () => users;

function login(username, password){
    const user = users.filter((u) => u.userName === username);
    if(!user[0]) throw Error('User not found');
    if(user[0].password !== password) throw Error('Password is incorrect.');
    return user[0];
}

function register(username, password, fname, lname, birthday){
    const u = users.filter((u) => u.userName === username);
    if(u.length>0) throw Error('Username already exists')
    const newUser = {
        userId: users[users.length-1].userId + 1,
        userName: username,
        password: password,
        firstName: fname,
        lastName: lname,
        Birthday: birthday,
    }
    users.push(newUser);
    return newUser;
}

module.exports = {getUsers, login, register};