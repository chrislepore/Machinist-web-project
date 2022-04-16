const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require("./sever/routes/user");


app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

//CORS middleware
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept, Authorization");
 res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
 next();
});
app.use("/users", userRoutes);
app.get('*', function (req, res) {
 res.sendFile(path.resolve(__dirname, 'public', 'bmi.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ( ) => console.log(`Server started on port ${PORT}!`)); 