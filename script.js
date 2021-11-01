
var APIKey = "e3e3e1aabeb1419efe8502037a31c2a9"
var search= document.getElementById("search");
var currentCity;
var dayInSeconds = 86400;
var cityName = document.getElementById("cityname");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvi = document.getElementById("uvi");
var uviDisplayNumber = document.getElementById("uvi-display-number");
var cityNames = localStorage.getItem("city names");
var searchList = $("#search-list");
var clear = document.getElementById("clear");

document.getElementById("current-weather").style.display="none";
document.getElementById("future-weather").style.display="none";
document.getElementById("forecast-label").style.display="none";

if(cityNames){
    cityNames= JSON.parse(cityNames);
}
else{
    cityNames= [];
}

function searchCity(event) {
  
    event.preventDefault();

    document.getElementById("current-weather").style.display="block";
    document.getElementById("future-weather").style.display="flex";
    document.getElementById("forecast-label").style.display="block";
    
    currentCity= document.getElementById("city").value;
    document.getElementById("city").value='';
   
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;
 
    fetch(queryURL)
    .then(function(response){
            return response.json();
            })
        .then(function(data) {
            
            if (data.name){
                    
                    if(cityNames.includes(data.name)==false){
                    cityNames.push(data.name);
                   
                    localStorage.setItem("city names", JSON.stringify(cityNames));
                    }
                
                cityName.textContent = data.name;
            
                displaySearchHistory();
             
                var lat= data.coord.lat;
                var lon= data.coord.lon;
              
                var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
                
                fetch(queryURL2)
                .then(function(response){
                    return response.json();
                    })
                .then(function(data) {
                    
                    var currentDate = new Date(data.current.dt*1000);
                    var formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                
                    date.textContent = "(" + formatCurrentDate + ")";
      
                    img_home.innerHTML= '';
                    var img = new Image();
                    img.src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                    img_home.appendChild(img);
                    temp.textContent = "Temp: " + data.current.temp + " °F";
                    humidity.textContent = "Humidity: " + data.current.humidity + "%";
                    wind.textContent = "Wind Speed: " + data.current.wind_speed + " mph";
                    uvi.textContent = "UV Index: ";
                    uviDisplayNumber.textContent = data.current.uvi;
                
                    uviNumber= data.current.uvi;
                    console.log(uviNumber);
                    if (uviNumber<=2){
                        uviDisplayNumber.style.backgroundColor = "green";
                        uviDisplayNumber.style.color = "white";
                    }
                    else if ((2<uviNumber)&&(uviNumber<=5)){
                        uviDisplayNumber.style.backgroundColor="yellow";
                        uviDisplayNumber.style.color = "black";
                    }
                    else if ((5<uviNumber)&&(uviNumber<=7)){
                        uviDisplayNumber.style.backgroundColor="orange";
                        uviDisplayNumber.style.color = "white";
                    }
                    else{
                        uviDisplayNumber.style.backgroundColor="red";
                        uviDisplayNumber.style.color = "white";
                    }
                 
                    for(var i=1; i<6; i++){
                        currentDate = new Date(data.daily[i].dt*1000);
                        formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                       
                        $("#"+i).empty();
                        
                        $("#"+i).append("<p style=font-weight:bold;font-size:20px>"+ formatCurrentDate + "</p>");
                        $("#"+i).append("<img src = https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png ></img>");
                        $("#"+i).append("<p>Temp: " + data.daily[i].temp.day + " °F</p>");
                        $("#"+i).append("<p>Wind Speed: " + data.daily[i].wind_speed + " mph</p>");
                        $("#"+i).append("<p>Humidity: " + data.daily[i].humidity + "%</p>");
                        $("#"+i).append("<p>UV Index: " + data.daily[i].uvi + "</p>");
                    };
    
                });
            }
            else {
                alert("That's not a valid city name. Please try again.");
                document.getElementById("current-weather").style.display="none";
                document.getElementById("future-weather").style.display="none";
                document.getElementById("forecast-label").style.display="none";
            }
        });
};

function displaySearchHistory() {
    searchList.empty();
   
    for(var i=0; i<cityNames.length; i++){
        searchList.append("<button class=cities list-group-item style=list-style:none;text-align:center;background-color:gray;color:white;margin-top:0px;font-weight:bold;border-radius:0.5em>"+cityNames[i]+"</button>");
    };
    $(".cities").each(function(city) {
   
        $(this).on("click", function(){
        currentCity= $(this).text();
        console.log(currentCity);
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;

        fetch(queryURL)
        .then(function(response){
                return response.json();
                })
            .then(function(data) {
               
                cityName.textContent = data.name;
                       
                 lat= data.coord.lat;
                 lon= data.coord.lon;
               
                 queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
                 
                 fetch(queryURL2)
                 .then(function(response){
                        return response.json();
                        })
                    .then(function(data) {
                   
                        var currentDate = new Date(data.current.dt*1000);
                        var formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                       
                        date.textContent = "(" + formatCurrentDate + ")";
                        
                        img_home.innerHTML= '';
                        var img = new Image();
                        img.src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                        img_home.appendChild(img);
                       
                        temp.textContent = "Temp: " + data.current.temp + " °F";
                        wind.textContent = "Wind Speed: " + data.current.wind_speed + " mph"
                        humidity.textContent = "Humidity: " + data.current.humidity + "%";
                        uvi.textContent = "UV Index: ";
                        uviDisplayNumber.textContent = data.current.uvi;
                         
                        uviNumber= data.current.uvi;
                        console.log(uviNumber);
                        if (uviNumber<=2){
                            uviDisplayNumber.style.backgroundColor = "green";
                            uviDisplayNumber.style.color = "white";
                        }
                        else if ((2<uviNumber)&&(uviNumber<=5)){
                            uviDisplayNumber.style.backgroundColor="yellow";
                            uviDisplayNumber.style.color = "black";
                        }
                        else if ((5<uviNumber)&&(uviNumber<=7)){
                            uviDisplayNumber.style.backgroundColor="orange";
                            uviDisplayNumber.style.color = "white";
                        }
                        else{
                            uviDisplayNumber.style.backgroundColor="red";
                            uviDisplayNumber.style.color = "white";
                        }

                       
                        for(var i=1; i<6; i++){
                            currentDate = new Date(data.daily[i].dt*1000);
                            formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                          
                            $("#"+i).empty();
                           
                            $("#"+i).append("<p>"+ formatCurrentDate + "</p>");
                            $("#"+i).append("<img src = https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png ></img>");
                            $("#"+i).append("<p>Temp: " + data.daily[i].temp.day + "° Fahrenheit</p>");
                            $("#"+i).append("<p>Humidity: " + data.daily[i].humidity + "%</p>");
                            $("#"+i).append("<p>Wind Speed: " + data.daily[i].wind_speed + " MPH</p>");
                            $("#"+i).append("<p>UV Index: " + data.daily[i].uvi + "</p>");
                        };
                    });
                });
        
        });
    });
};

search.addEventListener("click", searchCity);

clear.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    cityNames=[ ];
    searchList.empty();
});