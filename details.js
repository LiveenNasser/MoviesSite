
const showMovieData = async () => {
    var movieID = sessionStorage.getItem("movieID");//getting the movie id of the selected movie from sessionStorage
    const resp = await fetch("https://api.themoviedb.org/3/movie/" + movieID + "?api_key=2c46288716a18fb7aadcc2a801f3fc6b");
    const respData = await resp.json();
    const movie = {//creating movie object
        id: respData.id,
        overview: respData.overview,
        poster_path: respData.poster_path,
        title: respData.title,
    }
    document.getElementById("pageTitle").innerHTML = movie.title
    document.getElementById("movieImg").src = IMGPATH + movie.poster_path
    document.getElementById("overview").innerHTML = movie.overview
};
const addToFavorites = async () => {
    alert("Not Developed Yet")
}
showMovieData();