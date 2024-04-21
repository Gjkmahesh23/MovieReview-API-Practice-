const global = {
    currentPage : window.location.pathname,
    search: {
      term: '',
      page: 1,
      totalPages: 1,
      totalResults: 0,
    }
};

console.log(global.currentPage);




//Init App

function init (){
    switch (global.currentPage) {
        case '/MyMovieReview/flixx-app-theme/index.html':
          displaySlider();
          displayTrendingMovies();
            break;
        case '/MyMovieReview/flixx-app-theme/movies.html' :
          displayPopularMovies();
            break;
        case '/MyMovieReview/flixx-app-theme/shows.html' :
            displayPopularShows();
            break;
        case '/MyMovieReview/flixx-app-theme/movie-details.html' :
            displayMovieDetails();
            break;
        case '/MyMovieReview/flixx-app-theme/tv-details.html':
            displayShowDetails();
        case '/MyMovieReview/flixx-app-theme/search.html':
            search();
            break;
        case '/MyMovieReview/flixx-app-theme/search-results.html' :
            displaySearchDetails();
            break;
        case '/MyMovieReview/flixx-app-theme/home-results.html' :
            displayHomePageDetails();
            break;
        
    }
    highlightActiveLink();
}



//Fetch data for search 
async function fetchAPIDataForSearch(endpoint) {
 

  const url = 'https://advanced-movie-search.p.rapidapi.com/search/movie?query=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '265e94b275msh1c14a0fa5f52c5ap1a83a6jsn9348c9bf01cd',
		'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
	}
};
try {
  showSpinner();

	const response = await fetch(`${url}${endpoint}`, options);
	const result = await response.json();
	
  hideSpinner();
   return result;
} catch (error) {
	console.error(error);
}

}


//Fetch API Data 
async function fetchAPIData(endpoint){
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '265e94b275msh1c14a0fa5f52c5ap1a83a6jsn9348c9bf01cd',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};
try {
   
   showSpinner();
	const response = await fetch(`${url}${endpoint}`, options);
	const result = await response.json();
	
  hideSpinner();
   return result;
} catch (error) {
	console.error(error);
}
}


// Make Request To Home
async function fetchAPIDataFromIMDB2(endpoint) {
 

  const url = 'https://imdb188.p.rapidapi.com/api/v1/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '265e94b275msh1c14a0fa5f52c5ap1a83a6jsn9348c9bf01cd',
		'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
	}
};
try {

   showSpinner();
	const response = await fetch(`${url}${endpoint}`, options);
	const result = await response.json();
	
  hideSpinner();
   return result;
} catch (error) {
	console.error(error);
}

  // return data;
}



// Display Slider Movies
async function displaySlider() {
  const  results  = await fetchAPIDataFromIMDB2('getWeekTop10');
  const data = results.data;

  data.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="home-results.html?id=${movie.id}">
        <img src="${movie.primaryImage.imageUrl}" alt="${movie.originalTitleText.text}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.ratingsSummary.aggregateRating} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}



// Display 20 most trending Movies 
async function displayTrendingMovies() {
  const  data2  = await fetchAPIDataFromIMDB2('getFanFavorites?country=US');
  console.log(data2)
  const movieData = data2.data.list ;
  console.log(movieData)
  movieData.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="home-results.html?id=${movie.id}">
              ${
                movie.primaryImage.imageUrl
                  ? `<img
                src= "${movie.primaryImage.imageUrl}"
                class="card-img-top"
                alt="${movie.originalTitleText.text}"
              />`
                  : `<img
              src="./images/no-image.jpg"
              class="card-img-top"
              alt="${movie.originalTitleText.text}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.originalTitleText.text}</h5>
              <p class="card-text">
                <small class="text-muted">${movie.titleType.text}</small>
                <small class="text-muted">(Release: ${movie.releaseDate.year})</small>
              </p>
            </div>
          `;
  
      document.querySelector('#trending-movies').appendChild(div);
    });
}

// Display 20 most popular Movies 
async function displayPopularMovies() {
    const  data  = await fetchAPIData('');
    data.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
              <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.image
                    ? `<img
                  src= "${movie.image}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                    : `<img
                src="./images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.year}</small>
                </p>
              </div>
            `;
    
        document.querySelector('#popular-movies').appendChild(div);
      });
}


// Display 20 most popular tv shows
async function displayPopularShows() {
  const data = await fetchAPIData('series/');

  data.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.image
                ? `<img
              src="${show.image}"
              class="card-img-top"
              alt="${show.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.title}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.year}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}


// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split('p')[1];
  Number(movieId);
   console.log(movieId);
  const data = await fetchAPIData('');
  
   const movie = data[movieId-1];

  // Overlay for background image
  displayBackgroundImage('movie', movie.big_image);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.image
      ? `<img
    src="${movie.image}"
    class="card-img-top"
    alt="${movie.title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      Movie Rating :${movie.rating} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.year}</p>
    <p>
      ${movie.description}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genre.map((genreName) => `<li>${genreName}</li>`).join('')}
    </ul>
    <a href="${
      movie.imdb_link
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>

<div class="details-bottom">
          <h2>Movie Info</h2>
       <ul>
          <li><span class="text-secondary">IMDB Ranking  :</span> ${
            movie.rank
          }</li>
          <li><span class="text-secondary">IMDB Id   :</span> ${movie.imdbid}</li>
       </ul>

</div>

  `;

  document.querySelector('#movie-details').appendChild(div);
}



// Display Show Details
async function displayShowDetails() {
  const showId = window.location.search.split('p')[1];
  Number(showId);
   console.log(showId);
  const data = await fetchAPIData('series/');
  
   const show = data[showId-1];
   console.log(show)

  // Overlay for background image
  displayBackgroundImage('show', show.big_image);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.image
      ? `<img
    src="${show.image}"
    class="card-img-top"
    alt="${show.title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.title}"
/>`
  }
  </div>
  <div>
    <h2>${show.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.rating} / 10
    </p>
    <p class="text-muted">Release Date: ${show.year}</p>
    <p>
     Series Rating: ${show.description}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genre.map((genreName) => `<li>${genreName}</li>`).join('')}
    </ul>
    <a href="${
      show.imdb_link
    }" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>

<div class="details-bottom">
          <h2>Movie Info</h2>
       <ul>
          <li><span class="text-secondary">IMDB Ranking  :</span> ${
            show.rank
          }</li>
          <li><span class="text-secondary">IMDB Id   :</span> ${show.imdbid}</li>
       </ul>

</div>

  `;

  document.querySelector('#show-details').appendChild(div);
}


// Display Search Result Details
async function displaySearchDetails() {
  const searchName = window.location.search.split('=')[1];
  const searchId = window.location.search.split('=')[2];
  Number(searchId);
   console.log(searchId);
   console.log(searchName);
  const data = await fetchAPIDataForSearch(`${searchName}`);
  const resultData = data.results;
  console.log(resultData)
   
  let movie ;
  resultData.forEach((movieData) =>{
    if(movieData.id == searchId){
      movie = movieData
    }
  })
  

      // Overlay for background image
      displayBackgroundImage('movie', movie.backdrop_path);

      const div = document.createElement('div');
    
      div.innerHTML = `
    <div class="details-top">
      <div>
      ${
        movie.poster_path
          ? `<img
        src="${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
      }
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
         Movie Rating : ${movie.vote_average} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
          ${movie.overview}
        </p>
        
        <a href="${
          movie.backdrop_path
        }" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>

  <div class="details-bottom">
        <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Original Language :</span> ${
        movie.original_language
      }</li>
      <li><span class="text-secondary">Adult Rated :</span> ${
        movie.adult
      }</li>
      <li><span class="text-secondary">IMDB Id :</span> ${movie.id}</li>
    </ul>
  
  </div>
    
      `;
    
   
  document.querySelector('#movie-details').appendChild(div);
 
}


// Display Home page Results Details
async function displayHomePageDetails() {
  
  const searchId = window.location.search.split('=')[1];
  
   console.log(searchId);
   
  const data2 = await fetchAPIDataFromIMDB2('getFanFavorites?country=US');
  console.log(data2);
  const resultData = data2.data.list;
  console.log(resultData)
   
  let movie ;
  resultData.forEach((movieData) =>{
    if(movieData.id == searchId){
      movie = movieData
    }
  })
   console.log(movie);

      // Overlay for background image
      displayBackgroundImage('movie', movie.primaryImage.imageUrl);

      const div = document.createElement('div');
    
      div.innerHTML = `
    <div class="details-top">
      <div>
      ${
        movie.primaryImage.imageUrl
          ? `<img
        src="${movie.primaryImage.imageUrl}"
        class="card-img-top"
        alt="${movie.originalTitleText.text}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.originalTitleText.text}"
    />`
      }
      </div>
      <div>
        <h2>${movie.originalTitleText.text}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
         ${movie.titleType.text} Rating : ${movie.ratingsSummary.aggregateRating} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.releaseDate.year}</p>
        <p>
          ${movie.plot.plotText.plainText}
        </p>
        
        <a href="${
          movie.watchOptionsByCategory.categorizedWatchOptionsList[0].watchOptions[0].link 
        }" target="_blank" class="btn">Watch in OTT</a>
      </div>
    </div>

  <div class="details-bottom">
        <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Original Language :</span> English </li>
      <li><span class="text-secondary">Adult Rated :</span> ${
        movie.isAdult
      }</li>
      <li><span class="text-secondary">IMDB Id :</span> ${movie.id}</li>
    </ul>
  
  </div>
    
      `;
    
   
  document.querySelector('#movie-details').appendChild(div);
 
}



// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Search Function

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.term = urlParams.get('search-term');
  console.log(global.search.term);

  if (global.search.term !== '' && global.search.term !== null) {
    const data = await fetchAPIDataForSearch(`${global.search.term}`);

    global.search.page = data.page;
    global.search.totalPages = data.total_pages;
    global.search.totalResults = data.total_results;
    const searchName = global.search.term;

    if (data.results.length === 0) {
      showAlert('No results found');
      return;
    }

    console.log(data);
    const resultData = data.results;
    displaySearchResults(resultData);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
}


function displaySearchResults(data) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  data.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="search-results.html?id=${global.search.term}=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="${result.poster_path}"
              class="card-img-top"
              alt="${result.title}"
                />`
                    : `<img
                src="./images/no-image.jpg"
                class="card-img-top"
                alt="${result.title}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${result.release_date}</small>
                </p>
              </div>
            `;

    document.querySelector('#search-results-heading').innerHTML = `
              <h2>${data.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;

    document.querySelector('#search-results').appendChild(div);
  });

  

  displayPagination();
}



// Create & Display Pagination For Search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await fetchAPIDataForSearch(`${global.search.term}`);
    displaySearchResults(results);
  });

  // Prev page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await fetchAPIDataForSearch(`${global.search.term}`);
    displaySearchResults(results);
  });
}



// Show Alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

//Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
          }
      }
    );
  }

document.addEventListener('DOMContentLoaded', init);