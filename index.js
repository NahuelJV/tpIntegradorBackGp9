///importaciones 
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";


import producRouters  from "./src/api/routes/index.js";

//Middlewares : -> 
const app = express();
const port = environments.port;
 
app.use(cors());
app.use(express.json());
app.use(loggerUrl)


app.use("/api/productos",producRouters)
app.listen(port,()=>{
    console.log('servidor app en puerto: ' + port);
});


//Get productos

