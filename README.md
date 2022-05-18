Machinist Sales Website
=======================
********************************************************************************************************

Description
-----------

This project creates a sales website for a CNC machine shop. This website is a place for engineers to create a CNC part that includes a name, material, schematic(link), and finishing. Then an order can be placed for multiple parts which will create a payment form for the order. This app is not complete. For future versions, there will be a way to pay for orders, parts can be included in more than 1 order, the schematic of a part will include images instead of a link, parts can be deleted, and orders can be placed/edited/viewed. There will also be a list of parts of that is offered by the company, current prices for materials, and other details about the machinist economy.

In this website a user currently can:
* register, login, view, edit, and delete a account
* create, view, and edit a part

********************************************************************************************************

Current Bugs 
-----------

Orders and payment have not been implimented in the front end. However they both have functions and a table in the back-end.

********************************************************************************************************

Technologies Used: Front-End
-----------

Technologies: None\
Programming languages: html, CSS and javascript\
Frameworks: None


Technologies Used: Back-End
-----------

Technologies: MySQL, Axios, Node.js, nodemon, and Express.js\
Programming languages: javascript, SQL\
Frameworks: None

********************************************************************************************************

E-R Diagram
-----------

![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/E-R_Diagram.PNG)

**The User entity:** 

**The Parts entity:**

**The Orders entity:**

**The Payments entity:**


********************************************************************************************************


Steps to run database and website
---------------------------------

* Download Node.js via their website: https://nodejs.dev/download
* Open the terminal. 
* Enter the command: npm init
* Follow the directives and answer what you want. Just press
enter for anything you are unsure about or if you want to add
info later.
* Next, install express using with the command: npm install express
* install nodemon with the command: npm install nodemon --save-dev
and add: "dev": "nodemon index.js”
* start server with npm run dev (will need to be running for the server to function)
* Use the MySQL Community installer for Windows: https://dev.mysql.com/downloads/installer/ to install MYSQL (follow its instructions)
* install dotenv: npm install dotenv
* Install the MySQL2 driver with link: https://stackoverflow.com/questions/50093144/mysql-8-0-client-doesnot-support-authentication-protocol-requested-by-server
* Then use command npm install mysql2

All command are used in terminal.


********************************************************************************************************

Screenshots
-----------









