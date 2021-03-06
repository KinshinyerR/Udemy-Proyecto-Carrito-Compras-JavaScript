//Variables 
const cariito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const comprarCarritoBtn = document.querySelector('#comprar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
// let localStorage = localStorage.getItem('listaCarrito');

// console.log(localStorage);


cargarEventListeners();

function cargarEventListeners(){
    //cuando agregas un curso presionando el boton
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    cariito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito con el boton
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo
        limpiarHTML();         //Eliminamos todo el HTML
    })

    //Boton comprar
    comprarCarritoBtn.addEventListener('click', guardarLocalStorage)
}

/***********************Funciones****************************/ 

function guardarLocalStorage(){
    localStorage.setItem('listaCarrito', JSON.stringify(articulosCarrito));
}

function borrarLocalStorage(){
    localStorage.removeItem('listaCarrito');
}

function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar un curso del carrito 
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo articulosCarrito por el data-id 
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        //para limpiar el HTML llamamos la funcion carritoHTML
        carritoHTML();
    }
} 

// Leer el HTML al cual le dimos click y extrae la información del curso
function leerDatosCurso (curso){

    //creamos un objecto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito 
    const existe  = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;  //retorna el objeto actualizado
            }else{
                return curso;  //retorna los objetos que no son duplicados 
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregando elementos al arreglo articulosCarrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
}

//Muestra el articulosCarrito en el HTML 
function carritoHTML(){
    
    //Limpiar el HTML
    limpiarHTML();
    
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso =>  {
        const {imagen, titulo, precio, cantidad, id} = curso; //Esto nos evita escribir curso.imagen y ect

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100"> 
            </td>
            <td>${titulo}</td>                       
            <td>${precio}</td>                     
            <td>${cantidad}</td>                  
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>  

            </td>
        `;

        //Agrega el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){ 
    //Modo lento 
    // contenedorCarrito.innerHTML = '';

    //Modo rapido y buena practica.
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}