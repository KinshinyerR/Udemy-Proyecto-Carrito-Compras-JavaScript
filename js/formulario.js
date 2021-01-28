const btnComprar = document.getElementById('btnComprar');

btnComprar.addEventListener('click', () => {
    alert('Compra exitosa');
    localStorage.removeItem('listaCarrito');
    window.location='index.html';
});