const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS parts (
    part_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    material VARCHAR(255),
    schematic VARCHAR(255),
    finishing VARCHAR(255),
    user_id INT,
    order_id INT,
    CONSTRAINT part_pk PRIMARY KEY(part_id),
    CONSTRAINT userP_fk FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT order_fk FOREIGN KEY(order_id) REFERENCES orders(order_id)
  )`;
  await con.query(sql);
}
createTable();

let getParts = async () => { //get all parts
    const sql = `SELECT * FROM parts`;
    return await con.query(sql);
};

async function getPart(part) { //gets all parts with a partID or part name
  let sql;
  if(part.partId) {
    sql = `SELECT * FROM parts
      WHERE part_id = ${part.partId}
    `;
  } else {
    sql = `SELECT * FROM parts
      WHERE name = "${part.name}" AND user_id = ${part.userId}
    `;
  }
  return await con.query(sql);
}

async function getUserParts(userId) { //gets all parts of a user
    let sql;

    sql = `SELECT * FROM parts
    WHERE user_id = ${userId}
    `;

    return await con.query(sql);
}

async function createPart(part) { 
  const u = partExists(part.name, part.userId);
  if(u.length>0) throw Error("Username already exists");

  const sql = `INSERT INTO parts (name, material, schematic, finishing, user_id)
    VALUES ("${part.name}", "${part.material}", "${part.schematic}", "${part.finishing}", ${part.userId}) 
  `;

  const insert = await con.query(sql);
  const newPart = await getPart(part);
  return newPart[0];
}

async function deletePart(partId) {
    const sql = `DELETE FROM parts 
      WHERE part_id = ${partId}
    `;
    await con.query(sql);
}

async function editPart(part) {
  const sql = `UPDATE parts SET
      name = "${part.name}",
      material = "${part.material}",
      schematic = "${part.schematic}",
      finishing = "${part.finishing}",
    WHERE part_id = ${part.partId}
  `;
  const update = await con.query(sql);
  const newPart = await getPart(part);
  return newPart[0];
}

async function partExists(name, userId) {
  const sql = `SELECT * FROM parts
    WHERE name = "${name}" AND user_id = ${userId}
  `;
  return await con.query(sql);
}

  module.exports = { getParts, getPart, getUserParts, createPart, deletePart, editPart, createTable };