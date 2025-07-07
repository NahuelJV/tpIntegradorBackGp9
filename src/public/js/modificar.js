

//LOGICA PARA ELIMINAR PRODUCTO
const formEliminarProducto=document.getElementById("formulario-baja");
const listaId=document.getElementById("lista-id");
const url="http://localhost:5000";

function validarCodigo(data){
    if(data.id==0){
        return "El codigo no puede ser 0";
    }

    return null
}

formEliminarProducto.addEventListener("submit",consultarProducto);

async function consultarProducto(events) {
      events.preventDefault();
       //slistaId.innerHTML=`<p>cargarndo datoa</p>`; 
    try {
         let datosFormulario= new FormData(events.target);
        let dato=Object.fromEntries(datosFormulario.entries());
        const errorValidacion=validarCodigo(dato);
        if(errorValidacion){
            alert(errorValidacion);
            return
        }
        const idProducto = dato.idProd;
        const resultado =  await consultarIdProducto(idProducto);

        if (resultado.success){
            mostrarProducto(resultado.data)
        }
        else{
            alert("Error: " + resultado.message);
        }
    } 
    
    catch (error) {
        
    }
}



async function consultarIdProducto(idProducto) {
    try {
        const response =  await fetch(`${url}/productos/${idProducto}`);
        if(response.ok){
            const datosProducto = await response.json();
            //ver porque no entra aca
            if(!datosProducto.payload || datosProducto.payload.length==0){
                return {
                    success : false,
                    message : "Producto no encontrado",
                    data : null
                };
            }

            //Si tengo el producto
            return {
                    success : true,
                    message : "Producto encontrado",
                    data : datosProducto.payload[0]
                };

        }
        else{
            const error = await response.json();
            return{
                success : false,
                message : error.message || `Error ${response.status}`
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


function mostrarProducto(producto){
    const formEditar = document.getElementById("formulario-editar-producto");
    formEditar.innerHTML = `
<div class="card-editar">
  <div class="card-editar-imagen">
    <img src="${producto.img}" alt="${producto.nombre}">
  </div>
  <div class="card-editar-datos">
    <label>
      Código:
      <input type="text" name="codigo" value="${producto.codigo}" readonly>
    </label>
    <label>
      Nombre:
      <input type="text" name="nombre" value="${producto.nombre}" disabled>
    </label>
    <label>
      Precio:
      <input type="number" name="precio" value="${producto.precio}" disabled>
    </label>
    <label>
      Imagen:
      <input type="text" name="img" value="${producto.img}" disabled>
    </label>
    <label>
      Categoría:
      <input type="text" name="categoria" value="${producto.categoria}" disabled>
    </label>
    <label class="checkbox-label">
      <input type="checkbox" name="activo" ${producto.activo ? 'checked' : ''} disabled>
      Activo
    </label>
  </div>
  <div class="card-editar-botones">
    <button type="button" id="boton-editar" class="boton-editar">Editar Producto</button>
    <button type="button" id="boton-enviar" class="boton-actualizar">Actualizar</button>
  </div>
</div>
`;

    const botonEditar = document.getElementById("boton-editar");
    botonEditar.addEventListener("click", habilitarCampos);

    const botonEnviar = document.getElementById("boton-enviar");
    botonEnviar.addEventListener("click", actualizarProducto);

}

function habilitarCampos(){
    const formEditar = document.getElementById("formulario-editar-producto");
    const listInputs = formEditar.querySelectorAll("input");
    listInputs.forEach(input=>{
        if(input.name === "codigo") {
        input.disabled = true;
    } else {
        input.disabled = false;
    }
    });
}

async function actualizarProducto(){
    const formEditar = document.getElementById("formulario-editar-producto");
    const datosFormulario = new FormData(formEditar);
    const datos = Object.fromEntries(datosFormulario.entries());
    console.log("datos a enviar" + datos);
    const codigoInput = formEditar.querySelector('input[name="codigo"]');
   
    const codigo = codigoInput.value;
    console.log("datos a enviar" + codigo);
    datos.codigo=codigo;
    const resultado =   await enviarProductosActualizado(datos);
    if(resultado.success){
        alert("Producto actualizado")
    }
    else{
        alert("error actualizando producto")
    }
}


async function enviarProductosActualizado(dataProducto){
    try {
       let response= await fetch(`${url}/productos`,{
            method  : "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(dataProducto)

        });

        const result  = await response.json();

        if(response.ok){
            return{
                success : true,
                message : "Producto actualizado"
            };
        }
        else{
            return{
                success : false,
                message : "Ocurrio un error actualizando el producto"
            };
        }

    } catch (error) {
        return{
                success : false,
                message : "Error al enviar la solicitud"
            };
    }
}