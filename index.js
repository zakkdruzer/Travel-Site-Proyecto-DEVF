//Se crea una variable con datos como podrian llegarnos desde la BD
const datos = [
  {
    titulo: "Chile",
    imagen:
      "https://img.freepik.com/foto-gratis/paisaje-niebla-matutina-montanas-globos-aerostaticos-al-amanecer_335224-794.jpg?t=st=1727815999~exp=1727819599~hmac=6c98b55e765330698123b3222e6a9b8ada37d4a93095e10d9056ac9dd92ba83e&w=1380",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga maiores obcaecati blanditiis qui quas nihil nisi praesentium labore cupiditate? recusandae pariatur, id nam illo modi, quos incidunt quo autem recusandae pariatur, id nam illo modi, quos incidunt quo autem",
  },
  {
    titulo: "Colombia",
    imagen:
      "https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?t=st=1727816525~exp=1727820125~hmac=eedb6f8bc5dc38f8ea70cc7d04dfbf791033a13ddc7d3e27d8b724e245034315&w=1380",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga maiores obcaecati blanditiis qui quas nihil nisi praesentium labore cupiditate? recusandae pariatur, id nam illo modi, quos incidunt quo autem recusandae pariatur, id nam illo modi, quos incidunt quo autem",
  },
  {
    titulo: "Brazil",
    imagen:
      "https://img.freepik.com/foto-gratis/puente-madera-isla-koh-nangyuan-surat-thani-tailandia_335224-1082.jpg?t=st=1727823259~exp=1727826859~hmac=d363b9f872d624cc671e862a9a17990dade5e40a78292c4116100f66208ceca1&w=1380",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga maiores obcaecati blanditiis qui quas nihil nisi praesentium labore cupiditate? recusandae pariatur, id nam illo modi, quos incidunt quo autem recusandae pariatur, id nam illo modi, quos incidunt quo autem",
  },
];
const favoritos = [];
//Se captura la etiqueta "root" desde el html con el querySelector y su id
const root = document.querySelector("#root");

//Se inicializa una variable en vacio para ir concatenando cada elemento nuevo
let htmlActual = "";
let htmlFavoritos = "";

//Contenedor Favorites
const favoritesContainer = document.getElementById('favorites-container');

function mostrarFavoritos() {

  //Limpiar el contenedor de favoritos
  favoritesContainer.innerHTML = '';

  // Agregar el campo de búsqueda
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = `
    <input 
      type="text" 
      id="searchFavorites" 
      placeholder="Search country..." 
      class="search-input"
    />
  `;
  
  favoritesContainer.appendChild(searchContainer);

  //Recorrer el arreglo de favoritos y crear las tarjetas
  for (let i = 0; i < favoritos.length; i++) {
    const card = `
      <div class="card">
        <div class="card__img">
          <img src="${favoritos[i].imagen}" alt="" class="img" />
        </div>
        <h2 class="card__title">${favoritos[i].titulo}</h2>
        <div class="card__text">
          <p>${favoritos[i].desc}</p>
          <section class="botones-cajas">
            <button class="btn-visit">Visit Place</button>
            <button class="btn-remove">Remove From Favorites</button>
          </section>
        </div>
      </div>
    `;
    favoritesContainer.innerHTML += card;
  }

  //Agregar los event listeners DESPUÉS de crear todas las cards
  const favCards = favoritesContainer.querySelectorAll('.card');
  
  favCards.forEach((card, index) => {
    const btnRemove = card.querySelector('.btn-remove');
    const btnVisit = card.querySelector('.btn-visit');
    
    btnRemove.addEventListener('click', function() {
      favoritos.splice(index, 1); // Eliminar el elemento del array
      mostrarFavoritos(); // Actualizar la vista
      alert(`${favoritos[index].titulo} ha sido eliminado de favoritos`);
    });

    btnVisit.addEventListener('click', function() {
      const titulo = card.querySelector('.card__title').textContent;
      const imagen = card.querySelector('.card__img img').src;
      const texto = card.querySelector('.card__text p').textContent;
      
      mostrarPopup(titulo, imagen, texto);
    });
  });
  //Mostrar el contenedor de favoritos
  favoritesContainer.style.display = 'grid';
}

//Oculta o muestra las secciones de Places y Favorites

places.addEventListener("click", function() {
  console.log("se hizo click en places");
  root.style.display = 'flex';
  favoritesContainer.style.display = 'none';
});

favorites.addEventListener("click", function() {
  console.log("se hizo click en favoritos");
  mostrarFavoritos();
  root.style.display = 'none';
  
});

//Se recorre el elemento ROOT del html para ir pintado cada card
for (let i = 0; i < datos.length; i++) {
  htmlActual =
    htmlActual +
    `<div class="card">
    <div class="card__img">
      <img
        src=${datos[i].imagen}
        alt=""
        class="img"
      />
    </div>
    <h2 class="card__title">${datos[i].titulo}</h2>
    <div class="card__text">
      <p>
      ${datos[i].desc}
      </p>
      <section class="botones-cajas">
          <button class="btn-visit" >Visit Place</button>
          <button class="btn-add" >Add To Favorites</button>
        </section>
    </div>
  </div>`;

}
//Se sobreescribe la variable "root" que recordemos que es el que me va a renderizar todo mi html
//con lo que obtuvo el htmlActual
root.innerHTML = htmlActual;

const cards = document.querySelectorAll(".card");

const cardPopUp = document.querySelector(".card");

//Esta parte selecciona todas las tarjetas y configura los event listeners para los botones "Visit Place" y "Add To Favorites" en cada tarjeta.

cards.forEach((card) => {
  const btnVisit = card.querySelector(".btn-visit");
  const btnAdd = card.querySelector(".btn-add");
  const cardTitle = card.querySelector(".card__title");

  btnVisit.addEventListener("click", function() {
    const titulo = cardTitle.textContent;
    const imagen = card.querySelector(".card__img img").src;
    const texto = card.querySelector(".card__text p").textContent;
    
    mostrarPopup(titulo, imagen, texto);
  });

  btnAdd.addEventListener("click", function() {
    const titulo = cardTitle.textContent;
    const imagen = card.querySelector(".card__img img").src;
    const texto = card.querySelector(".card__text p").textContent;
    
  //Verificar si ya existe en favoritos
    let existe = favoritos.some(favorito => favorito.titulo === titulo);

    if (!existe) {
      favoritos.push({
        titulo: titulo,
        imagen: imagen,
        desc: texto,
      });
      mensaje(titulo);
    } else {
      alert(`${titulo} ya está en favoritos`);
      return;
    }
    console.log(favoritos);
  });

});

//Esta función crea y muestra un popup con los detalles de la tarjeta seleccionada.

function mostrarPopup(titulo, imagen, texto) {
  // Verificar si el contenedor existe
  if (!popupContainer) {
      console.error('El contenedor del pop up no se encontró en el DOM');
      return;
  }

  //Detiene el desplazamiento
  document.body.classList.add('no-scroll');

  const popupTemplate = `
      <div class="popup">
          <div class="popup-content">
              <span class="close-btn">&times;</span>
              <h5 class="popup-title">${titulo}</h5>
              <div class="imgYtext"> 
                <img class="popup-image" src="${imagen}" alt="$ {titulo}">
                <p class="popup-text">${texto}</p>
              </div>  
          </div>
      </div>
  `;
  
  popupContainer.innerHTML = popupTemplate;
  
  const popup = popupContainer.querySelector('.popup');
  
  // Verificar si el pop-up se creó correctamente
  if (!popup) {
      console.error('No se pudo crear el pop-up');
      return;
  }

  const closeBtn = popup.querySelector('.close-btn');
  
  popup.style.display = 'block';
  
  closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';

      // Restaura el desplazamiento
      document.body.classList.remove('no-scroll');
  });
  
  popup.addEventListener('click', (e) => {
      if (e.target === popup) {
          popup.style.display = 'none';

          // Restaura el desplazamiento
          document.body.classList.remove('no-scroll');
      }
  });
}

function mensaje(cardTitle){
  alert(`${cardTitle} agregada a favoritos`);
}