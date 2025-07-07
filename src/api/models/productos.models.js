import conn from "../database/db.js";


/////////////// CONSULTAS A LA BASE DE DATOS ///////////////////////////////////
const consultarProductos = async () =>{
    let cadSql = 'select * from productos'
    return await conn.query(cadSql);
}



//////////// MODIFICACIONES A LA BASE DE DATOS/////////////////////////////////

//Insertar registro
//Ver bien columas
const insertarProducto = async(codigo,nombre,precio,img,categorias,activo) => {
    let cadSql = "insert into producto (codigo,nombre,precio,img,categoria,activo) value (?,?,?,?,?,?)";

    return await conn.query(cadSql,[codigo,nombre,precio,img,categorias,activo]);
}

const actualizarProducto = async(nombre,precio,img,categorias,activo,codigo) =>{
    let cadSql = "update producto set nombre = ?,precio = ?,img =? ,categoria = ? ,activo = ? where codigo = ?";
    return await conn.query(cadSql,[nombre,precio,img,categorias,activo,codigo]);
}

export default{
    insertarProducto,
    consultarProductos,
    actualizarProducto
} 