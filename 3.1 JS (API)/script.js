async function getWeather() {

  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("result");

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {

    // 🌍 Step 1: Get coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `<h2>❌ City not found</h2>`;
      return;
    }
    

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    // 🌦️ Step 2: Get weather
    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const w = weatherData.current_weather;

  

    // 📊 Step 3: Show result
    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `
      <h2>📍 ${place.name}, ${place.country}</h2>

      <div class="row">🌍 Latitude: ${lat}</div>
      <div class="row">🌍 Longitude: ${lon}</div>
      <div class="row">🌡️ Temperature: ${w.temperature} °C</div>
      <div class="row">💨 Wind Speed: ${w.windspeed} km/h</div>
      <div class="row">🕒 Time: ${w.time}</div>
    `;

  } catch (error) {
    console.error(error);
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `<h2>⚠️ Error fetching data</h2>`;
  }
}