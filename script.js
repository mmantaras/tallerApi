let animeTitulo = document.getElementById("animeTitulo");
const obtenerInfo = document.getElementById("obtenerInfo");
const resultadosInfoAnime = document.getElementById("resultadosInfoAnime");
const animeContainer = document.getElementById("container");
const subtitulo = document.getElementById("subtitulo")
const paginationContainer = document.getElementById("pagination"); // Contenedor de paginación
let BtnNext;
let BtnPrevious;

// Establecer una cookie con SameSite=Lax y Secure
document.cookie = "miCookie=miValor; SameSite=Lax; Secure";

obtenerInfo.addEventListener("click", () => {
    
    if (animeTitulo.value === "") {
      alert("Por favor, complete el campo de búsqueda.");
      return;
    } else {
        
      return getAnimesList(1);
    }
  });
  


async function getResponse(anime) {
  try {
    const response = await fetch(anime);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

async function getAnimesList(page) {

  animeContainer.innerHTML = ``
        subtitulo.innerHTML = ``
        paginationContainer.innerHTML = ``
        currentPage = 1; // Reiniciar la página actual

  const animeTitle = animeTitulo.value.trim();
  
  //El anime al que le estamos sacando la informacion
  const anime = `https://api.jikan.moe/v4/anime?q=${animeTitle}&page=${page}&limit=10`;
  const response = await getResponse(anime);
  console.log(response)
  //let animeID = animeName.sort((a, b) => a.mal_id - b.mal_id)[0].mal_id;

  subtitulo.innerHTML += `<p>Resultado de su búsqueda: <strong>${animeTitle}</strong></p>`

  response.data.forEach(anime => {
    
    animeContainer.innerHTML += `
    
    <div id=style >
        <div><img src=${anime.images.jpg.image_url} alt="${anime.title}"/></div>
        <div id=tituloAnime>${anime.title}</div>
        <a href=${anime.url} target="_blank" rel="noreferrer">Más info</a>
    </div>
    ` 
  });
 

  if (response.data.length >0) setPagination(response.pagination)
  
}

function numPagina(pageNumber) {
  
  getAnimesList(pageNumber);
}

  
    
  


function previousPage () {

var elementPage = paginationContainer.getElementsByClassName("active")[0]
var page = elementPage.innerHTML
//elementPage.classList.remove("active")
getAnimesList(page -1)
console.log(elementPage)

  
}

function nextPage () {

  var elementPage = paginationContainer.getElementsByClassName("active")[0]
  var page = elementPage.innerHTML
  
  //elementPage.classList.remove("active")
  getAnimesList(Number(page) + 1)
  console.log(elementPage)
  
    }


function setPagination(pagination) { 
console.log("estamos en el método de paginación", pagination)
  let n = 1;
  
  let htmlPagination = ""
  while (n <= pagination.last_visible_page) {
    let htmlElement = `<li  onclick="numPagina(${n})" class="page-item"><a class="page-link" href="#">${n}</a></li>`
    if (n === pagination.current_page)
      htmlElement = `<li  class="page-item"><a class="page-link active" href="#">${n}</a></li>`
  
   htmlPagination += htmlElement;
  
    n++;
  }
  

  paginationContainer.innerHTML += `
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li onclick="previousPage()" class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      ${htmlPagination}

      <li onclick="nextPage()" class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  ` 

}

