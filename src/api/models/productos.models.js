import conn from "../database/db.js";


/////////////// CONSULTAS A LA BASE DE DATOS ///////////////////////////////////
const consultarProductos = async () =>{
    let cadSql = 'select * from productos'
    return await conn.query(cadSql);
}



//////////// MODIFICACIONES A LA BASE DE DATOS/////////////////////////////////

//Insertar registro
//Ver bien columas
const insertarProducto = async() => {
    let cadSql = "insert into producto (nombre,precio,img,categeoria,activo) value (?,?,?,?,?)";

    return await conn.query(cadSql,[nombre,precio,img,categeoria,activo]);
}

