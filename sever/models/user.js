const users = [
    {
    userId: 12345,
    userName: "cathy123",
    Email: "leporec1@newpaltz.edu",
    },
    {
    userId: 55555,
    userName: "fredburger54",
    Email: "chrisl2000@live.com",
    }
];

let getUsers = () => users;

function login(username, password){
    const user = users.filter((u) => u.userName === username || u.Email === username);
    if(!user[0]) throw Error('User not found');
    if(user[0].password !== password) throw Error('Password is incorrect.');
    return user[0];
}

module.exports = { getUsers, login};