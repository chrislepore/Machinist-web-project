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



module.exports = { createTable };