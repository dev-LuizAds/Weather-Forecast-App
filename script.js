// variables
var city = document.getElementById("cityName");
const btnSearch = document.querySelector("button");
const cityTitle = document.querySelector("h5");
const temperature = document.getElementById("temp");
const minTemp = document.getElementById("tempMin");
const maxTemp = document.getElementById("tempMax");
const pressure = document.getElementById("press");
const humidity = document.getElementById("humid");
const windySpeed = document.getElementById("windyspeed");
const img = document.querySelector("img");
const hourly = document.getElementById('hourly')

const boxLoad = document.querySelector(".boxLoad");

const apiKey = "18bf11075fa4363c70ff57c435285e27";

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    btnSearch.click();
  }
});

function getDataAPI() {
  if (city.value) {
    if (city.value != undefined) {
      var urlBase = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&lang=pt-br&units=metric`;
      boxLoad.style.display = "block";
      fetch(urlBase)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          city.value = "";
          
          document.querySelector('main').style.display ='block'
          document.querySelector(".box").style.display = "block";
          cityTitle.innerHTML = data.name + " - " + data.sys.country;
          cityTitle.style.cursor ='pointer'
          cityTitle.addEventListener('click', ()=>{
            window.open(`https://www.google.com/search?q=${encodeURIComponent(data.name + " "+data.sys.country)}`, 'googleSearchTab');
          })
          var iconCode = data.weather[0].icon;
          document.querySelector("p").innerHTML = data.weather[0].description;
          img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const local = (data.dt+ data.timezone)*1000
          const date = new Date(local)
          var hour = date.getUTCHours().toString().padStart(2, '0');
          var minutes = date.getUTCMinutes().toString().padStart(2, '0');

          if(hour>12){
            hourly.innerHTML =  hour + ':'+ minutes +" PM"
          }else{
            hourly.innerHTML =  hour + ':'+ minutes +" AM"
          }

          temperature.innerHTML = data.main.temp + "°C";
          minTemp.innerHTML = data.main.temp_min + " °C";
          maxTemp.innerHTML = data.main.temp_max + " °C";
          pressure.innerHTML = data.main.pressure + " hPa";
          humidity.innerHTML = data.main.humidity + " %";
          windySpeed.innerHTML = data.wind.speed + " m/s";
          document.querySelector("#visib").innerHTML =
            (data.visibility / 1000).toFixed(2) + " Km";
          boxLoad.style.display = "none";
          console.log(`Lat: ${data.coord.lat} - Long: ${data.coord.lon}`);
          changeScreen(data);
        })
        .catch((err) => {
          console.log("City not found. " + err);
          alert("City not found.");
          boxLoad.style.display = "none";
          document.querySelector("main").style.display = "none";
          document.body.style.backgroundImage = "url('/backgrounds/mainImage.png')";
        });
    }
  } else {
    alert("Type a city.");
  }
}

// Switch background
var changeScreen = (data) => {
  const screenImg = data.weather[0].description;
  switch (screenImg) {
    case "clear sky":
      document.body.style.backgroundImage = "url(/backgrounds/clearSky.jpg)";
      break;
    case "mist":
      document.body.style.backgroundImage = "url(/backgrounds/mist.jpg)";
      break;
    case "rain":
      document.body.style.backgroundImage = "url(/backgrounds/rain.jpg)";
      break;
    case "broken clouds":
      document.body.style.backgroundImage =
        "url(/backgrounds/brokenClouds.jpg)";
      break;
    case "shower rain":
      document.body.style.backgroundImage = "url(/backgrounds/showerrain.jpg)";
      break;
    case "scattered clouds":
      document.body.style.backgroundImage =
        "url(/backgrounds/scatteredclouds.jpg)";
      break;
    case "snow":
      document.body.style.backgroundImage = "url(/backgrounds/snow.jpg)";
      break;
    case "thunderstorm":
      document.body.style.backgroundImage =
        "url(/backgrounds/thunderstorm.jpg)";
      break;
    case "light rain":
      document.body.style.backgroundImage = "url(/backgrounds/lightrain.avif)";
      break;
    case "overcast clouds":
      document.body.style.backgroundImage =
        "url(/backgrounds/overcastclouds.jpg)";
      break;
    case "few clouds":
      document.body.style.backgroundImage = "url(/backgrounds/fewClouds.webp)";
      break;
    case "fog":
      document.body.style.backgroundImage = "url(/backgrounds/fog.jpg)";
      break;
    case "light intensity shower rain":
      document.body.style.backgroundImage =
        "url(/backgrounds/light-intensity-shower-rain.jpg)";
      break;
    case "drizzle":
      document.body.style.backgroundImage = "url(/backgrounds/drizzle.jpg)";
      break;
    default:
      document.body.style.backgroundImage = "";
      break;
  }
};

btnSearch.addEventListener("click", getDataAPI);


