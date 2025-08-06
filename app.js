const API_KEY = '504ec288'; 
const searchBtn = document.getElementById('searchBtn');
const queryInput = document.getElementById('query');
const moviesContainer = document.getElementById('movies');

searchBtn.addEventListener('click', () => {
  const query = queryInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    alert('Please enter a movie title.');
  }
});

async function fetchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${'504ec288'}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>No results found. Please try another title.</p>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    moviesContainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
    
    movieCard.innerHTML = `
      <img src="${poster}" alt="${movie.Title}" />
      <div class="details">
        <div class="title">${movie.Title}</div>
        <div class="year">${movie.Year}</div>
      </div>
    `;

    moviesContainer.appendChild(movieCard);
  });
}


