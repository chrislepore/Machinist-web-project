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

let getPayments = async () => { 
  const sql = `SELECT * FROM payments`;
  return await con.query(sql);
};

async function getPayment(payment) { 
const  ql = `SELECT * FROM payments
    WHERE payment_id = ${payment.paymentId}
  `;

return await con.query(sql);
}

async function createPayment(payment) { 

const sql = `INSERT INTO parts (payment_date, payment_amount, order_id)
  VALUES ("${payment.paymentDate}", "${payment.paymentAmount}", ${payment.orderId}) 
`;

const insert = await con.query(sql);
const newPayment = await getPayment(payment);
return newPayment[0];
}

async function deletePayment(paymentId) {
  const sql = `DELETE FROM payments 
    WHERE payment_id = ${paymentId}
  `;
  await con.query(sql);
}

async function editPayment(payment) {
const sql = `UPDATE payments SET
    payment_date = "${payment.paymentDate}",
    payment_amount = "${payment.paymentAmount}"
  WHERE part_id = ${payment.paymentId}
`;
const update = await con.query(sql);
const newPayment = await getPayment(payment);
return newPayment[0];
}


module.exports = { getPayments, getPayment, createPayment, deletePayment, editPayment, createTable };