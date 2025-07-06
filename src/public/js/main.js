//LOGICA PARA DAR DE ALTA PRODUCTOS

const formularioProducto = document.getElementById("formulario-producto");
const url="http://localhost:5000";

//Validacion de datos del formulario : 

formularioProducto.addEventListener("submit", altaProducto);

function validarDatos(data){
    if(!data.codigo ||!data.nombre || !data.precio || !data.categorias || !data.activo){
        return "Todos los campos son obligatorios";
    }
    //Si no hay error retornamos null
    return null;
}

async function altaProducto(events) {
    console.log("entre a la funcion");
    events.preventDefault();
    let datosFormulario= new FormData(events.target);
    let dato=Object.fromEntries(datosFormulario.entries());

    const errorValidacion=validarDatos(dato);
    if(errorValidacion){
        alert(errorValidacion);
        return
    }

    const resulatado = await enviarProducto(dato);
    if(resulatado.success){
        alert(resulatado.message);
        formularioProducto.reset();
    }
    else{
        alert("Error : " +resulatado.message);
    }
}

async function enviarProducto(datos) {
    try {
        let response = await fetch(`${url}/altaProducto`,{
            method :'POST',
            headers:{
                 "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        });

        if(response.ok){
            let resul= await response.json();
            return {
                success : true,
                message : resul.message
            };

        }
        else{
            let error = await response.json();
            return {
                success : false,
                message : resul.message
            };
        }
    } catch (error) {
        console.error("Error al enviar datos:",error);
        return {
                success : false,
                message : "Error al enviar la solicitud"
            };
    }
}

//LOGICA PARA EDITAR UN PRODUCTO

