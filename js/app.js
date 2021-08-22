// Variables
const cart = document.querySelector('#cart'),
      courses = document.querySelector('#courses'),
      cartList = document.querySelector('#cart-list tbody'),
      removeCartBtn = document.querySelector('#remove-cart');

let articlesCart = [];

loadEventListener();

function loadEventListener() {
  // Cuando agregas un curso presionando "Agregar al carrito"
  courses.addEventListener('click', addCourses);

  // Elimina cursos del carrito
  cart.addEventListener('click', deleteCourse);

  // Vaciar el carrito
  removeCartBtn.addEventListener('click', () => {
    articlesCart = []; // Reseteamos el arreglo
    // cartHTML();

    clearHTML(); //Eliminamos todo el HTML
  });
}

// Funciones
function addCourses(e) {
  e.preventDefault();
  if (e.target.classList.contains('add-cart')) {
    const selectedCourse = e.target.parentElement.parentElement;
    // console.log(selectedCourse);
    readDataCourse(selectedCourse);
  }
}

// Eliminar cursos del carrito
function deleteCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains('remove-course')) {
    const courseId = e.target.getAttribute('data-id');
    console.log(courseId);

    // Eliminar del arreglo articuloCarrito por el data-id
    articlesCart = articlesCart.filter( course => course.id !== courseId);
  }

  cartHTML() // Volvemos a iterar sobre el carrito y mostrar su HTML
}

// Lee el contenido del HTML que le dimos click y extrae la info del curso
function readDataCourse(course) {
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
    quantity: 1,
  }

  // Revisa si un elemento ya existe en el carrito
  const exist = articlesCart.some( course => course.id === infoCourse.id );
  if (exist) {
    // Actualizamos la cantidad
    const courses = articlesCart.map( course => {
      if (course.id === infoCourse.id) {
        course.quantity++;
        return course; // Retorna el objeto actualizado
      } else{
        return course; // Retorna los objetos que nos son los duplicados
      }
    });
    articlesCart = [...courses];
  } else {
    // Agregamos el curso al carrito

    // Agrega elementos al arreglo del carrito
    articlesCart = [...articlesCart, infoCourse];
    console.log(articlesCart);
  }

  cartHTML();
}

// Muestra el carrito de compras en el HTML
function cartHTML() {
  // Limpiar HTML
    clearHTML();
  
  // Recorreo el carrito y genera el HTML
    articlesCart.forEach( course => {
      const {image, title, price, id, quantity} = course;
      // console.log(course);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <img src="${image}" width="100">
        </td>
        <td class="table-title">${title}</td>
        <td>${price}</td>
        <td>${quantity}</td>
  
        <td>
          <a href="#" class="remove-course" data-id="${id}"> X </a>
        </td>
      `;
  
      // Agrega el HTML del carrito en el tbody
      cartList.appendChild(row);
    });
  }

  function clearHTML() {  
    while (cartList.firstChild) {
      cartList.removeChild(cartList.firstChild);
    }
  }