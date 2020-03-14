$(document).ready(function () {
    var apiUrl = "https://api.themoviedb.org/3/discover/movie";
    var apiKey = "3dc10d04a30f7b13a6d697435f363644";

    // on load get all the movies 
    $.ajax({
        url: apiUrl + "?api_key=" + apiKey + "&sort_by=release_date.desc" + "&page=1",
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            console.log(result);
        }
    })

   //search movies  
   // Note: searchMovies ---> search button id,  searchByName ---> search textbox id(delete this comment once integreated ) or create a function on click and call this api
    $('#searchMovies').click(function () {
        var keyword = $('#searchByName').val()
        $.ajax({
            url: apiUrl + "?api_key=" + apiKey + "&keywords=" + keyword + "&page=1",
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {
                console.log(result);
            }
        })
    });
})



