const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS payments (
    payment_id INT NOT NULL AUTO_INCREMENT,
    payment_date DATE,
    payment_amount INT,
    order_id INT,
    CONSTRAINT payment_pk PRIMARY KEY(payment_id),
    CONSTRAINT orderP_fk FOREIGN KEY(order_id) REFERENCES orders(order_id)
  )`;
  await con.query(sql);
}
createTable();




module.exports = { createTable };