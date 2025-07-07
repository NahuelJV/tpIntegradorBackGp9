const loggerUrl=(req,res,next)=>{
    const fecha = new Date().toISOString();
    const metodo = req.metodo;
    
    console.log("ghola");
    next();
};


export {
    loggerUrl
}