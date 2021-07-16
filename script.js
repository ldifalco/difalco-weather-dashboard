//Define variables
var APIKey = "e3e3e1aabeb1419efe8502037a31c2a9"
var currentCity = "";
var lastCity = "";
var cityName = document.getElementById("cityname");
var temp = document.getElementById("tempurature");
var wind = document.getElementById("wind");
var humid = document.getElementById("humidity");
var uvi = document.getElementById("uvi");
var searchButton =document.getElementById("city-search");
savedCities = localStorage.getItem("city names")
//hide cards before search 
document.getElementById("todays-weather").style.display="none";
document.getElementById("upcoming-weather").style.display="none";

if(cityNames){
    cityNames= JSON.parse(cityNames);
}
else{
    cityNames= [];
}
//search function
function searchCity(event) {
event.preventDefault();
//show cards after search
document.getElementById("todays-weather").style.display="block";
document.getElementById("upcoming-weather").style.display="block";

currentCity= document.getElementById("city-name").nodeValue;
document.getElementById("city-name").value="";

//API Call URL
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + APIKey;

//fetch request function for API call
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
             