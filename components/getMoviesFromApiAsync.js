function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then(response => response.json())
        .then(responseJson => responseJson.movies)
        .catch(error => console.error(error));
}

export default getMoviesFromApiAsync;