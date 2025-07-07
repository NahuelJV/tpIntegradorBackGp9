import conn from "../database/db.js"


//Controlador - Gestionamos las peticiones y respuestas al cliente
export const getProductos = async(req,res)=>{
    let cQuery = "select * from producto";
    console.log("llege")
    try {
        let [rows] =  await conn.query(cQuery);
        res.status(200).json({
            payload:rows
        })

    } catch (error) {
        console.error("Error obteniendo productos",error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

export const geProductobyId=async(req,res)=>{
    const idProducto=req.params.id;

    let cQuery = "select * from producto where codigo=?";
    console.log("llege"+idProducto)
    try {
        let [rows] =  await conn.query(cQuery,[idProducto]);

        if(rows.length===0){
            return res.status(404).json({
                success: false,
                message : "Producto no encontrado"
            })
        }
        res.status(200).json({
            payload:rows
        })

    } catch (error) {
        console.error("Error obteniendo productos",error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}


export const PostProducto=(req, res) => {
    console.log("POST /altaProducto Body:", req.body);
    let {codigo,nombre,precio,img,categorias,activo} = req.body;
    myslqService.insertarProducto(codigo,nombre,precio,img,categorias,activo);
    try {
        res.status(201).json({
            success: true,
            message : "Producto agregado correctamente"
        });
    } catch (error) {
        console.error("Error creando producto", error);
        res.status(500).json({
            message: "Error al crear producto"
        });
    }
}


export const deleteProducto = async(req,res)=>{
    const idProducto=req.params.id;

    let cQuery = "delete from producto where codigo=?";
    console.log("llege"+idProducto)
    try {
        const [result] =  await conn.query(cQuery,[idProducto]);

        if(result.affectedRows===0){
            return res.status(404).json({
                success: false,
                message : "Producto no encontrado"
            })
        }
        res.status(200).json({
           success: false,
            message : "Producto eliminado correctamente"
        })

    } catch (error) {
        console.error("Error obteniendo productos",error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

export const putProducto = async(req,res)=>{
    console.log("PUT - Body",req.body);
    const { nombre, precio, img, categorias, activo,codigo } = req.body;
    try {
        await myslqService.actualizarProducto(nombre,precio,img,categorias,activo,codigo);
         res.status(200).json({
                success: true,
                message : "Producto actualizado"
            })
    } catch (error) {
        console.error("errr",error);
        res.status(500).json({
            success: false,
            message : "Error actualizando producto"
        })
    }
}