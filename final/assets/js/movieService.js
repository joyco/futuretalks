app.factory('movieService', function ($http) {
    var apiUrl = "https://api.themoviedb.org/3/movie";
    var apiKey = "3dc10d04a30f7b13a6d697435f363644";
    var Movie = function () { };
    // get all the movies
    Movie.prototype.getAllMovies = function (paramObj, callback) {
        let path = "/upcoming" + "?api_key=" + apiKey + "&page=" + paramObj.page
        get(path, function (error, result) {
            callback(error, result);
        });
    };

    // get movie details by id
    Movie.prototype.getMovieDetailsById = function(movieId, callback){
        let path = "/" + movieId +  "?api_key=" + apiKey; 
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









