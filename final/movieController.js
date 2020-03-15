
app.controller('movieController', function ($scope, movieService) {
    $scope.movieService = new movieService();
    var options = {
        page: 1
    }
    $scope.movies = []
    $scope.loading_flag = false;
    $scope.sorted_movies = [];
    // get all the movies
    $scope.getAllMovies = function () {
        if (!$scope.loading_flag) {
            $scope.loading_flag = true;

            if ($scope.total_pages != undefined) {
                if ($scope.currentPage <= $scope.total_pages) {
                    $scope.currentPage = $scope.currentPage + 1;
                }
            } else {
                $scope.currentPage = options.page;
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
                setTimeout(function () {
                    $scope.loading_flag = false;
                }, 2000);
            });
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
            window.location.href = 'details.html';
        })
    }

    // search movie
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
            result.data.results.forEach(element => {
                if (element.poster_path != null) {
                    $scope.movies.push(element)
                }
            })

        })
    }

    // Function to Sort the Data by given Property
    function sortByProperty(property) {
        return function (a, b) {
            var sortStatus = 0,
                aProp = a[property],
                bProp = b[property];
            if (aProp < bProp) {
                sortStatus = -1;
            } else if (aProp > bProp) {
                sortStatus = 1;
            }
            return sortStatus;
        };
    }

    // sortby
    $scope.sortMovie = function (keyword) {
        if (keyword === "upcoming")
            $scope.sorted_movies = [];
        else
            $scope.sorted_movies = $scope.movies.sort(sortByProperty(keyword));
    }

    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.getAllMovies(options)
    }


    // scope.loadMoreCourses = function () {
    //     // if (scope.loadingResult) {
    //     //     return;
    //     // }
    //     if ($scope.option.page >=  $scope.total_pages) {
    //         return;
    //     }
    //     $scope.currentPage = $scope.currentPage + 1;
    //     // $scope.page = (scope.pagination.currentPage - 1) * scope.pagination.pageSize;
    //     // $scope.page = scope.pagination.pageSize;
    //     // scope.loadingResult = true;
    //     // $scope.movie = CourseService.courses.list({ offset: scope.offset, limit: scope.limit });
    //     // scope.loadingResult = false;
    //     let param = {
    //         page: $scope.currentPage
    //     }
    //     $scope.movieService.getAllMovies(param, function (error, result) {

    //     })
    // };

    // scope.initializeResultList = function () {
    //     CourseService.courses.count({}, function (count) {
    //         scope.total = count;
    //         scope.pagination.noOfPages = Math.ceil(count / scope.pagination.pageSize);
    //         scope.loadMoreCourses();
    //     });
    // }
});

app.controller('detailsController', function ($scope) {
    console.log($scope);
});
