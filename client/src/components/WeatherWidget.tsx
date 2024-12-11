import { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherService';

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData(55.75, 37.62); // Координаты по умолчанию
        setWeather(data);
      } catch (err) {
        setError('Ошибка при загрузке погоды');
      }
    };

    fetchWeather();
  }, []);

  if (error) return <div>{error}</div>;
  if (!weather) return <div>Загрузка...</div>;

  return (
    <div>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <div>{Math.round(weather.main.temp)}°C</div>
      <div>{weather.weather[0].description}</div>
    </div>
  );
};