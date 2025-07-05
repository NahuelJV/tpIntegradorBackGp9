//importamos el momdulo mysql2 en modo promesa para poder usar asnyc/await para db

import mysql from "mysql2/promise";
import environments from "../config/environments.js";

const { database }  = environments;

const conn = mysql.createPool({
    host:database.host,
    database : database.name,
    user : database.user,
    password : database.password
});

export default conn;