const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    creation_date TIMESTAMP,
    due_date DATE,
    user_id INT NOT NULL,
    CONSTRAINT order_pk PRIMARY KEY(order_id),
    CONSTRAINT user_fk FOREIGN KEY(user_id) REFERENCES users(user_id)
  )`;
  await con.query(sql);
}
createTable();

let getOrders = async () => {
  const sql = `SELECT * FROM orders`;
  return await con.query(sql);
};

async function getOrder(order) { //gets all orders with a orderID
  let sql;
  sql = `SELECT * FROM orders
  WHERE part_id = ${order.orderId}
  `;
  return await con.query(sql);
}


async function getUserOrders(userId) { //gets all orders of a user
  let sql;

  sql = `SELECT * FROM orders
  WHERE user_id = ${userId}
  `;
  
  return await con.query(sql);
}

async function createOrder(order) { 
  
  const sql = `INSERT INTO orders (due_date, user_id)
    VALUES (${order.dueDate}, ${order.userId}) 
  `;

  const sql2 = `UPDATE parts SET
  order_id = "${order.orderID}"
  WHERE part_id = ${part.partId}
`;

  const insert = await con.query(sql);
  const newPart = await getPart(part);
  return newPart[0];
}

module.exports = { getOrders, getOrder, getUserOrders, createTable };