import connection from "../db.js";

async function postSignUp(name, email, encryptedPassword){
  return connection.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3);
  `, [name, email, encryptedPassword]);
};

async function postSignIn(token, user){
  return connection.query(`
    INSERT INTO sessions ("userId", token)
    VALUES ($1, $2);
  `, [user.id, token]);
}

async function checkId(id){
  return connection.query(`
    SELECT *
    FROM links
    WHERE id = $1
  `, [id]);
};

async function checkUserCredentials(email){
  return connection.query(`
    SELECT * 
    FROM users
    WHERE email = $1;
  `, [email]);
};

async function checkIfRegistered(email){
  return connection.query(`
    SELECT users.email 
    FROM users
    WHERE email = $1;
  `, [email]);
}

export const authRepository = {
  postSignIn,
  postSignUp,
  checkId,
  checkUserCredentials,
  checkIfRegistered
}