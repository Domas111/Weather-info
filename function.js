function search() {
  let content = document.getElementById("weatherLocation");
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + content.value + '&units=METRIC&APPID=934bba235903fa32d3181dc1ce9f6d03')
  .then((response) => response.json())
  .then((responseJson) => {
      updateView(responseJson);
      content.value = "";
  })
};


function currentLoc(){
  navigator.geolocation.getCurrentPosition(function(position){
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=METRIC&APPID=934bba235903fa32d3181dc1ce9f6d03')
    .then((currentResponse) => currentResponse.json())
  .then((currentResponseJson) => {
      updateView(currentResponseJson);
  })
  });
  
}; 


                                         
function updateView(responseJson){
   let location = document.querySelector("#name");
      let temp = document.querySelector("#currentTemp");
      let icon = document.getElementById("icon");
      let details = document.querySelector("#moreDetails");
      let lastUpdate = document.querySelector("#updatedAt");
      let desc = document.querySelector("#desc");
      let wind = document.querySelector("#wind");
      let descUpper = responseJson.weather[0].description;
      let maxTemp = document.querySelector("#maxTemp");
      let minTemp = document.querySelector("#minTemp");
      let clouds = document.querySelector("#clouds");

      location.textContent = responseJson.name + ", " + responseJson.sys.country;
      temp.textContent = Math.round(responseJson.main.temp) + "°c";
      icon.src = "http://openweathermap.org/img/wn/" + responseJson.weather[0].icon + "@2x.png";   
      lastUpdate.textContent = "Last updated - " + new Date(responseJson.dt * 1000).toLocaleString();

      desc.textContent = descUpper.toUpperCase();
      wind.textContent = "Wind: " + responseJson.wind.speed + "m/s";

      maxTemp.textContent = "Max Temp: " + Math.round(responseJson.main.temp_max) + "°c";
      minTemp.textContent = "Min Temp: " + Math.round(responseJson.main.temp_min) + "°c";
      clouds.textContent = "Clouds: " + responseJson.clouds.all + "%";
};
   

document.getElementById("findLoc").addEventListener("click", currentLoc);
document.getElementById("search").addEventListener("click", search);
document.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    search();
  }
});


currentLoc();

  
