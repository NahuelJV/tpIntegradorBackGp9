import { Router } from "express";
import conn from "../database/db.js"
import myslqService from "../models/productos.models.js"
import { deleteProducto, geProductobyId, getProductos, PostProducto, putProducto } from "../controllers/product.controllers.js";

const router= Router();


router.get("/",getProductos); 

//Falta agrewgar validaciones

router.get("/:id",geProductobyId); 


router.post("/altaProducto",PostProducto);

router.delete("/:id",deleteProducto); 

router.put("/",putProducto);


//Agregamos por default xq rompe 
//export{
  //  router
//}
export default router;
