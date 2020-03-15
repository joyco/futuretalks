
app.controller('movieController', function ($scope, movieService) {
    $scope.movieService = new movieService();
    var options = {
        page: 1
    }
    $scope.movies = []
    $scope.loadingFlag = false;

    // search movie
    $scope.searchActive = false;
    $scope.search = ""
 
    $scope.searchMovie = function () {
        $scope.searchActive = true;
        if ($scope.total_search_results > 0) {
            if ($scope.currentSearchPage <= $scope.total_search_pages) {
                $scope.currentSearchPage = $scope.currentSearchPage + 1;
            }
        } else {
            $scope.movies = []
            $scope.currentSearchPage = options.page;
        }
        let param = {
            page: $scope.currentSearchPage,
            keyword: $scope.search
        }
        $scope.movieService.searchMovies(param, function (error, result) {
            
            if (error) {
                // handle error
            }
            $scope.total_search_results = result.data.total_results;
            $scope.total_search_pages = result.data.total_pages;
            $scope.currentSearchPage = $scope.currentSearchPage;
            result.data.results.forEach(element => {
                if (element.poster_path != null) {
                    $scope.movies.push(element)
                }
            })

        })
    }
    // get all the movies
    $scope.getAllMovies = function () {
        if (!$scope.loadingFlag) {
            $scope.loadingFlag = true;
            if ($scope.search != "") {
                // search movie
                $scope.searchMovie()
            } else {
                // upcomin movie
                if ($scope.total_pages != undefined) {
                    if ($scope.currentPage <= $scope.total_pages) {
                        $scope.currentPage = $scope.currentPage + 1;
                    }
                } else {
                    $scope.currentPage = options.page;
                }

                if ($scope.searchActive) {
                    $scope.movies = []
                    $scope.currentPage = 1
                    $scope.searchActive = false
                }
                $scope.movieService.getAllMovies($scope.currentPage, function (error, result) {
                    if (error) {
                        //handle error
                    }
                    // $scope.movies = []
                    $scope.total_results = result.data.total_results;
                    $scope.total_pages = result.data.total_pages;
                    $scope.currentPage = $scope.currentPage;
                    result.data.results.forEach(element => {
                        if (element.poster_path != null) {
                            $scope.movies.push(element)
                        }
                    });

                });
            }


            setTimeout(function () {
                $scope.loadingFlag = false;
            }, 2000);
        }
    }


    // initially get all the movies
    $scope.getAllMovies()


    // get movie details by id
    $scope.getDetailsById = function (movieId) {
        $scope.movieService.getMovieDetailsById(movieId, function (error, result) {
            if (error) {
                //handle error
            }
            $scope.movieDetails = result.data;
        })
    }



    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.total_search_results = 0;
        $scope.getAllMovies()

    }






});
