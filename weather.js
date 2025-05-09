async function fetchWeatherData(callback) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://clartstore.com/CHROME/meteo.php?lat=${lat}&lon=${lon}&token=${token}`;
      console.log("📡 URL appelée :", url);

      const response = await fetch(url, {
        method: "GET",
        mode: "cors"
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();

      callback(data);
    } catch (err) {
      console.error("Erreur récupération météo :", err);
      callback(null);
    }
  }, (error) => {
    console.error("Erreur géolocalisation :", error);
    callback(null);
  });
}
