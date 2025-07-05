///importaciones 
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import conn from "./src/api/database/db.js";

const app = express();
const port = environments.port;

app.use(cors());

app.listen(port,()=>{
    console.log('servidor app en puerto: ' + port);
});


//Get productos

app.get("/productos",async(req,res)=>{
    let cQuery = "select * from producto";
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