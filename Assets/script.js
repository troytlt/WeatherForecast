
$(document).ready(function(){   
   var d = new Date();
   var n = d.getTime();
   var t = new Date(n);
    function printCity() {
        var citySearch = $('#city-search').val().trim();
        $('#city-name').html(citySearch + ' '+'('+ t + ')');
    }
    //function to shorten dates retrieved from API response
    function short(name, numberOfChar) {
        let string = name.split('');
        var arr=[];
        for (let i=0;i<numberOfChar; i++) {
            arr.push(string[i]);
            var shortName = arr.join('')
        }
        return shortName;
    }
    // function to store searched cities to local storage
    function stored(item) {
        localStorage.setItem('cities',JSON.stringify(item));
    }
    var cities = JSON.parse(localStorage.getItem("cities"))|| [];
    // function to render cities
    function renderCities(Cities) {
        $('#history-search').html("");
        for (let i=0;i<=Cities.length;i++) {
            if (Cities[i] !== undefined) {
                var li = $('<div>');
                li.attr('id','History');
                var para = li.html(Cities[i]+'<hr>');
                $('#history-search').append(para);
            }
            
        }
        
    }
    function renderLastSearch() {
        for (let i=0;i<=cities.length;i++) {
            if (cities[i] !== undefined) {
                var li = $('<div>');
                li.attr('id','History');
                var p = li.html(cities[i]+'<hr>');
                $('#history-search').append(p);
            }
            
        }
    }
    renderLastSearch();
    //function to get item from local storage
    function getLocalStorage() {
        var storedCities = JSON.parse(localStorage.getItem("cities"));
        if (storedCities !== null) {
            var Cities = storedCities;
        }
        renderCities(Cities);
    }
    $("button").on("click",function(event) {
        event.preventDefault();
        printCity();
        var citySearch = $('#city-search').val().trim();
         // API key and url
         var key = "abc6459aa5ca92773c2b57151b729417";
         var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
             + citySearch+"&appid="+key;
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response){
            var temperature = response.main.temp;
            $('#current-info').html('<br>'+'Temperature: '+temperature+'<br>');
            var humidity = response.main.humidity;
            $('#current-info').append('Humidity: '+humidity+'<br>');
            var windSpeed = response.wind.speed;
            $('#current-info').append('Wind Speed: '+windSpeed+'<br>');
        })
    });
    $('button').on('click',function(event) {
        event.preventDefault();
        var searchKey = $('#city-search').val().trim();
         // API key and url
        var key = "abc6459aa5ca92773c2b57151b729417";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+searchKey+"&appid="+key;
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response){
            for (i=0;i<40;i+=8) {
                var dates = response.list[i].dt_txt;
                var temp = response.list[i].main.temp;
                var icon = response.list[i].weather[0].icon;
                var iconURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                var humidity = response.list[i].main.humidity;
                var shortDate = short(dates,10);
                $("#day-"+i).html("<strong>"+shortDate+"</strong>"
                +'<br>'+'<img src='+"'"+iconURL +"'"+'</img>'
                +"<br>" + "<p> Temperature: "+temp
                +"<br>Humidity: "+ humidity+"</p>");
            }
        })
    })
    // click to store searched cities to local storage
    $('button').on('click',function(event){
        event.preventDefault();
        var searchedKey = $('#city-search').val().trim();
        console.log(searchedKey);
        if (cities.includes(searchedKey)=== false) {
            cities.push(searchedKey);
            console.log(cities);
            stored(cities);
            getLocalStorage();
        }
        

    })
    // click om history search to display current weather info
    $('#History').on('click',function(event){
        event.preventDefault();
        printCity();
        var citySearch = $(this).val().trim();
        console.log($(this).val());
         // API key and url
         var key = "abc6459aa5ca92773c2b57151b729417";
         var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
             + citySearch+"&appid="+key;
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response){
            var temperature = response.main.temp;
            $('#current-info').html('<br>'+'Temperature: '+temperature+'<br>');
            var humidity = response.main.humidity;
            $('#current-info').append('Humidity: '+humidity+'<br>');
            var windSpeed = response.wind.speed;
            $('#current-info').append('Wind Speed: '+windSpeed+'<br>');
        })
    })
    // click on history search to display forecast
    $('#History').on('click',function(event){
        event.preventDefault();
        var searchKey = $(this).val().trim();
         // API key and url
        var key = "abc6459aa5ca92773c2b57151b729417";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+searchKey+"&appid="+key;
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response){
            for (i=0;i<40;i+=8) {
                var dates = response.list[i].dt_txt;
                var temp = response.list[i].main.temp;
                var icon = response.list[i].weather[0].icon;
                var iconURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                var humidity = response.list[i].main.humidity;
                var shortDate = short(dates,10);
                $("#day-"+i).html("<strong>"+shortDate+"</strong>"
                +'<br>'+'<img src='+"'"+iconURL +"'"+'</img>'
                +"<br>" + "<p> Temperature: "+temp
                +"<br>Humidity: "+ humidity+"</p>");
            }
        })
    })
})
