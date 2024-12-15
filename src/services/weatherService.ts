const WEATHER_API_URL = process.env.REACT_APP_OPENWEATHERMAP_API_URL;
const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const fetchWeatherData = async (lat: number, lon: number) => {
  if (!WEATHER_API_URL || !WEATHER_API_KEY) {
    throw new Error('Weather API URL or API Key is not defined');
  }

  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data;
};
