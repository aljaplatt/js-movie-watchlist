const searchBtn = document.querySelector('.search-btn');
const userInputEl = document.querySelector('input');
const movieContainer = document.querySelector('.movie-container');

const renderMovies = async movieArr => {
	movieArr.map(async movie => {
		//* imdb info
		const imdbId = movie.imdbID;
		let response = await fetch(
			`https://www.omdbapi.com/?i=${imdbId}&apikey=7188dc6d`
		);
		let imdbData = await response.json();
		console.log(imdbData);
		//=========================================
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
		titleEl.classList.add('title');
		const title = movie.Title;
		titleEl.textContent = `${title}`;
		textDiv.append(titleEl);
		//==========================================
		// //* rating
		const ratingEl = document.createElement('span');
		const rating = imdbData.Rated;
		ratingEl.textContent = `${rating}`;
		textDiv.append(ratingEl);
		//=========================================
		//* year
		const yearEl = document.createElement('p');
		yearEl.classList.add('margin-bottom');
		const year = imdbData.Released;
		yearEl.textContent = `${year}`;
		textDiv.append(yearEl);
		movieDiv.append(textDiv);
		//=========================================
		//* plot
		const plotEl = document.createElement('p');
		plotEl.classList.add('margin-bottom');
		const plot = imdbData.Plot;
		plotEl.textContent = `${plot}`;
		textDiv.append(plotEl);
		//========================================
		//* runtime
		const runtimeEl = document.createElement('p');
		const runtime = imdbData.Runtime;
		runtimeEl.textContent = `${runtime}`;
		textDiv.append(runtimeEl);
		//========================================
		//* imdb rating
		const imdbRatingEl = document.createElement('p');
		const imdbRating = imdbData.imdbRating;
		imdbRatingEl.textContent = `${imdbRating}`;
		textDiv.append(imdbRatingEl);
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
