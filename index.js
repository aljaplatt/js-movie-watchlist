const searchBtn = document.querySelector('.search-btn');
const userInputEl = document.querySelector('input');
const movieContainer = document.querySelector('.movie-container');

const renderMovies = async movieArr => {
	movieArr.map(async movie => {
		// create div to hold data for each movie
		const movieDiv = document.createElement('div');
		movieDiv.classList.add('movieDiv');
		const textDiv = document.createElement('div');
		textDiv.classList.add('textDiv');
		// append movieDiv to HTML
		movieContainer.append(movieDiv);

		// create element for each property we want to show, add content & append to its div
		//* poster
		const posterEl = document.createElement('img');
		posterEl.classList.add('poster');
		const poster = movie.Poster;
		// console.log(poster);
		posterEl.src = poster;
		movieDiv.append(posterEl);
		//==========================================
		//* title
		const titleEl = document.createElement('h3');
		const title = movie.Title;
		titleEl.textContent = `${title}`;
		textDiv.append(titleEl);
		//==========================================
		//* year
		const yearEl = document.createElement('p');
		const year = movie.Year;
		yearEl.textContent = `${year}`;
		textDiv.append(yearEl);
		movieDiv.append(textDiv);
		//=========================================
		//* imdb info
		const imdbId = movie.imdbID;
		let response = await fetch(
			`https://www.omdbapi.com/?i=${imdbId}&apikey=7188dc6d`
		);
		let imdbData = await response.json();
		console.log(imdbData);
	});
};

const fetchMovies = async _ => {
	const userInput = userInputEl.value;
	// console.log(userInput);

	let res = await fetch(
		`https://www.omdbapi.com/?s=${userInput.trim()}&apikey=7188dc6d`
	);
	let data = await res.json();
	// console.log(data);
	const movies = data.Search;
	console.log(movies);
	renderMovies(movies);
};

searchBtn.addEventListener('click', fetchMovies);
