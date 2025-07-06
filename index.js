///importaciones 
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import conn from "./src/api/database/db.js";
import myslqService from "./src/api/models/productos.models.js";


const app = express();
const port = environments.port;

app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log('servidor app en puerto: ' + port);
});


//Get productos

app.get("/productos",async(req,res)=>{
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
}); 

//Falta agrewgar validaciones

app.get("/productos/:id",async(req,res)=>{
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
}); 


app.post("/altaProducto", (req, res) => {
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
});






app.delete("/productos/:id",async(req,res)=>{
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
}); 

app.put("/productos",async(req,res)=>{
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
});