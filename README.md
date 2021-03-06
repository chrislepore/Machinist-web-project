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

**The User entity:** Holds the customer's information and is used to determine access to other entity's columns.

**The Parts entity:** Holds all the information for the part which was designed by the user. Can be linked to 1 order.

**The Orders entity:** Holds information about a order and is linked to multiple parts through a foreign key.

**The Payments entity:** Holds only the information for paying 1 order.


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
and add: "dev": "nodemon index.js???
* start server with npm run dev (will need to be running for the server to function)
* Use the MySQL Community installer for Windows: https://dev.mysql.com/downloads/installer/ to install MYSQL (follow its instructions)
* install dotenv: npm install dotenv
* Install the MySQL2 driver with link: https://stackoverflow.com/questions/50093144/mysql-8-0-client-doesnot-support-authentication-protocol-requested-by-server
* Then use command npm install mysql2

All command are used in terminal.


********************************************************************************************************

Screenshots
-----------

![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/login.PNG)
**LOGIN PAGE**


![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/register.PNG)
**REGISTER PAGE**


![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/home.PNG)
**HOME PAGE**


![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/account.PNG)
**ACCOUNT PAGE**


![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/part_info.PNG)
**PART INFO PAGE**


![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/edit.PNG)
**EDIT PAGE FOR ACCOUNT AND PARTS**


![](https://github.com/chrislepore/Machinist-web-project/blob/main/public/images/create_part.PNG)
**CREATE PART PAGE**








