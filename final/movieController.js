
app.controller('movieController', function ($scope, movieService) {
    $scope.movieService = new movieService();
    // get all the movies
    $scope.getAllMovies = function (param) {
        $scope.movieService.getAllMovies(param, function (error, result) {
            if (error) {
                //handle error
            }
            $scope.movies = result.data.results;
        });
    }

    let options = {
        page: 1
    }
    // initially get all the movies
    $scope.getAllMovies(options)


    // get movie details by id
    $scope.getDetailsById = function (movieId) {
        $scope.movieService.getMovieDetailsById(movieId, function (error, result) {
            if (error) {
                //handle error
            }
            $scope.movieDetails = result.data;
        })
    }

    $scope.searchMovie = function (keyword) {
        let param = {
            page: 1,
            keyword: keyword
        }
        $scope.movieService.searchMovies(param, function (error, result) {
            $scope.movies = []
            if (error) {
                // handle error
            }
            console.log(result.data.results)
            $scope.movies = result.data.results;
        })
    }
});
