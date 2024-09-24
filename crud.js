
let personas = [];
let editIndex = -1; //index para poder ubicar el elemento del array
const form = document.getElementById("form");
const form2 = document.getElementById("form2");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const nuevaFila = "";
const tabla = document.getElementById("tabla");
const infoPersona = document.getElementById("informacion");

form.addEventListener("submit",()=>{// listener para que el formulario tenga comportamiento y comprobacion default
    event.preventDefault(); 
    agregar();
})

function agregar() {
  const idPersona = document.getElementById("idPersona").value;
  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const estado = document.getElementById("estado").value;
  const aprobado = document.getElementById("aprobado").checked;

  const nuevaPersona = {
    id: idPersona || new Date().getTime(), //se crea un id unico para el elemto del array o se obtiene el que ya tenia 
    nombre: nombre,
    edad: edad,
    estado: estado,
    aprobado: aprobado,
  };

  if (editIndex === -1) {//si el index no existe en el array se agregar un elemento nuevo
    personas.push(nuevaPersona);
  } else {
    personas[editIndex] = nuevaPersona; //si exite entoces se procede a sobrescribir para editar 
    editIndex = -1;
  }
  form.reset();// dejar el formulario en blanco de nuevo
  pintarTabla(); //y se pinta la informacion
}

function pintarTabla() {
    if (personas.length != 0) { //comprobacion para que la tabla se muestre hasta que haya objetos en el array
        tabla.classList.remove('mostrar')
    } 

  cuerpoTabla.innerHTML = "";

  personas.forEach(function (persona, index) { //mostrar cada fila en html
    const fila = cuerpoTabla.insertRow();
    fila.innerHTML = `<tr>
                <th>${persona.id}</th>
                <th>${persona.nombre}</th>
                <th>${persona.edad}</th>
                <th>${persona.estado}</th>
                <th>${persona.aprobado ? "Sí" : "No"}</th>
                <th>
                    <button onclick="editarPersona(${index})" type="submit">Editar</button>
                    <button onclick="eliminarPersona(${index})" type="submit">Eliminar</button>
                </th>
            </tr>`;
  });
}

function editarPersona(index) { // funcion de editar que es sobrescribir datos
  const persona = personas[index];
  document.getElementById("idPersona").value = persona.id;
  document.getElementById("nombre").value = persona.nombre;
  document.getElementById("edad").value = persona.edad;
  document.getElementById("estado").value = persona.estado;
  document.getElementById("aprobado").checked = persona.aprobado;
  editIndex = index;
}

function eliminarPersona(index) {   //eliminar el elemento de index en el array y en el html
  personas.splice(index, 1);
  if (personas.length == 0) {
    tabla.classList.add('mostrar')
    } 
  pintarTabla();
}

form2.addEventListener("submit",()=>{// listener para que el formulario tenga comportamiento y comprobacion default
    event.preventDefault(); 
    buscarPersona()
})

function buscarPersona() {
    const buscarId = document.getElementById("buscar").value;  // Obtener el nombre a buscar

    // Buscar una persona cuyo id coincida con 'buscarNombre'
    const personaEncontrada = personas.find(persona => String(persona.id) === buscarId);

    if (personaEncontrada) {
        // Mostrar la información de la persona encontrada
        infoPersona.innerHTML = `
            <h2>Información de la persona:</h2>
            <p><strong>ID:</strong> ${personaEncontrada.id}</p>
            <p><strong>Nombre:</strong> ${personaEncontrada.nombre}</p>
            <p><strong>Edad:</strong> ${personaEncontrada.edad}</p>
            <p><strong>Estado:</strong> ${personaEncontrada.estado}</p>
            <p><strong>Aprobado:</strong> ${personaEncontrada.aprobado ? 'Sí' : 'No'}</p>
        `;
    } else {
        alert("No se encontró la persona.");
    }
}