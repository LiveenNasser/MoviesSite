const popularMoviesURL = "https://api.themoviedb.org/3/movie/popular?api_key=2c46288716a18fb7aadcc2a801f3fc6b"
const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=2c46288716a18fb7aadcc2a801f3fc6b"
const favoritesURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=2c46288716a18fb7aadcc2a801f3fc6b"
const topRatedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=2c46288716a18fb7aadcc2a801f3fc6b"
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
var selected = "home";//variable to save selected option from the navbar
var counter = 1;//counter to know till which page we are showing right now

// show top rated movies list
const getTopRated = async () => {
    main.innerHTML = ""; //Empty current content
    selected = "topRated" //set navbar selected value
    counter = 1;//reset counter
    document.getElementById("pageTitle").innerHTML = 'Top Rated Movies'//setting title regarding to nav bar selection
    const resp = await fetch(topRatedURL);
    const respData = await resp.json();
    showMovies(respData.results);
}
// show nowPlaying  movies list
const getNowPlaying = async () => {
    main.innerHTML = ""; //Empty current content
    selected = "nowPlaying" //set navbar selected value
    counter = 1;//reset counter 
    document.getElementById("pageTitle").innerHTML = 'Now Playing Movies'//setting title regarding to nav bar selection
    const resp = await fetch(nowPlayingURL);
    const respData = await resp.json();
    showMovies(respData.results);
}
const openDetails = async (movieID) => {
    sessionStorage.setItem("movieID", movieID);//setting the id of the selected movie to session storage
    window.open('../view/details.html', "_blank")
}

// show favorites list movies list 
const showFavoritesList = async () => {
    alert("Not Developed Yet")
}

//getting popular movies
const getPopularMovies = async () => {
    main.innerHTML = "";
    selected = "home" //set navbar selected value
    counter = 1;//reset counter 
    document.getElementById("pageTitle").innerHTML = 'Popular Movies'//setting title regarding to nav bar selection
    const resp = await fetch(popularMoviesURL);
    const respData = await resp.json();
    showMovies(respData.results);
};
// show the movies that we get from the url
const showMovies = (movies) => {
    movies.forEach((movie) => {
        const { poster_path, title, id } = movie; // initializing the movie data
        const movieEl = document.createElement("div"); //creating movieEl as element div
        movieEl.classList.add("movie"); //associate class for the movieEl 
        movieEl.innerHTML = `
        <div>
        <img 
          src="${IMGPATH + poster_path}" onClick="openDetails(${id})"
        />
          <h3>${title}</h3>
        </div>
        `;
        main.appendChild(movieEl);
    });
};
//load more movies
const loadMore = async () => {
    //checking which tab is selected from the nav bar to navigate to the suitable link
    switch (selected) {

        case "home"://if the selected is home tab
            counter += 1; // increasing the counter
            const homeResp = await fetch(popularMoviesURL + "&page=" + counter); //sending request to get more movies from the next page
            const homeRespData = await homeResp.json();
            showMovies(homeRespData.results);
            break;
        case "nowPlaying"://if the selected is nowPlaying tab
            counter += 1;
            const nowPlayingResp = await fetch(nowPlayingURL + "&page=" + counter);
            const nowPlayingRespData = await nowPlayingResp.json();
            showMovies(nowPlayingRespData.results);
            break;
        case "favorites"://if the selected is favorites tab
            //const resp = await fetch(favoritesURL+"&page="+counter);
            //const respData = await resp.json();
            // showMovies(respData.results);
            break;
        case "topRated"://if the selected is topRated tab
            counter += 1;
            const topRatedResp = await fetch(topRatedURL + "&page=" + counter);
            const topRatedRespData = await topRatedResp.json();
            showMovies(topRatedRespData.results);
            break;
    }
}
if (!((window.location.href).includes("details"))) {
    getPopularMovies();
}
