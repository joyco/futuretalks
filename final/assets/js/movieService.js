app.factory('movieService', function ($http) {
    var apiUrl = "https://api.themoviedb.org/3/";
    var apiKey = "3dc10d04a30f7b13a6d697435f363644";
    var Movie = function () { };
    // get all the movies
    Movie.prototype.getAllMovies = function (paramObj, callback) {
        let path = "movie/upcoming" + "?api_key=" + apiKey + "&page=" + paramObj.page
        get(path, function (error, result) {
            callback(error, result);
        });
    };

    // get movie details by id
    Movie.prototype.getMovieDetailsById = function(movieId, callback){
        let path = "movie/" + movieId +  "?api_key=" + apiKey; 
        get(path, function(error, result){
            callback(error, result)
        })
    }

    // search
    Movie.prototype.searchMovies = function(paramObj, callback){
        let path = "search/movie/" +  "?api_key=" + apiKey + "&query=" + paramObj.keyword + "&page=" + paramObj.page; 
        get(path, function(error, result){
            callback(error, result)
        })
    }

    // function to handle all the get calls to api
    function get(path, callback) {
        $http({
            method: "GET",
            url: apiUrl + path,
           })
            .then(function (response) {
                var result = response;
                callback(false, result);
            },
                function (error) {
                    if (error) {
                        console.log(error)
                        callback(error, false);
                    }
                });
    }
    return Movie;
})









