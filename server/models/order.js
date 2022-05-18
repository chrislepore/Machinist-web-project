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
  WHERE order_id = ${order.orderId}
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

async function createOrder(order, part) { 
  
  const sql = `INSERT INTO orders (due_date, user_id)
    VALUES (${order.dueDate}, ${order.userId}) 
  `;

  const sql2 = `UPDATE parts SET
  order_id = "${order.orderId}"
  WHERE part_id = ${part.partId}
  `;

  const insert = await con.query(sql);
  const insert2 = await con.query(sql2);
  const newOrder = await getOrder(order);
  return newOrder[0];
}

async function editOrder(order) {
  const sql = `UPDATE parts SET
      due_date = "${order.dueDate}"
    WHERE order_id = ${order.orderId}
  `;
  const update = await con.query(sql);
  const newOrder = await getOrder(order);
  return newOrder[0];
}

module.exports = { getOrders, getOrder, getUserOrders, createOrder, editOrder, createTable };