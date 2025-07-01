const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") return alert("Please enter a city name!");

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      document.getElementById("weather-box").style.display = "block";
      document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
      document.getElementById("city-name").innerText = data.name;
      document.getElementById("humidity").innerText = data.main.humidity;
      document.getElementById("wind-speed").innerText = data.wind.speed;

      const iconCode = data.weather[0].icon;
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
    });
});
