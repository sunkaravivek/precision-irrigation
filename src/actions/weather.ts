"use server"

export async function fetchFarmWeather(locationName: string) {
  try {
    // 1. Geocoding API: Convert string (e.g. "Punjab") to Latitude and Longitude
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&format=json`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
       return { error: `Could not reliably locate coordinate data for "${locationName}". Please try a broader city or region name.` };
    }

    const { latitude, longitude, name, admin1, country } = geoData.results[0];
    const resolvedLocationContext = `${name}, ${admin1 || country}`;

    // 2. Open-Meteo Forecast API: Fetch Current Temperature, Humidity, Rain, and Daily Evapotranspiration
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain&daily=et0_fao_evapotranspiration,precipitation_probability_max&timezone=auto`);
    const weatherData = await weatherRes.json();

    if (weatherData.error) {
       return { error: "Real-time weather API rejected the request." };
    }

    const current = weatherData.current;
    const daily = weatherData.daily;

    // Open-Meteo daily arrays return multiple days. Index 0 is today.
    const rainfall = current.rain; // mm in the last hour
    const rainForecastProb = daily.precipitation_probability_max[0] || 0; // percentage
    const rainForecastExpected = rainForecastProb > 40; // boolean threshold
    const evapotranspiration = daily.et0_fao_evapotranspiration[0] || 4.5; // mm/day

    return { 
      success: true, 
      resolvedLocationContext,
      data: {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        rainfall: rainfall,
        evapotranspiration: evapotranspiration,
        rainForecast: rainForecastExpected,
      } 
    };
  } catch (error) {
    console.error("Open-Meteo Fetch Failure:", error);
    return { error: "Failed to connect to the external meteorological API. Check network status." };
  }
}
