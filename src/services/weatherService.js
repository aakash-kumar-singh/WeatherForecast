// const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchForecastData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch forecast data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const groupForecastByDay = (forecastData) => {
  if (!forecastData || !forecastData.list) return [];

  const dailyData = {};

  forecastData.list.forEach((item) => {
    const date = formatDate(item.dt);

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temps: [],
        icons: [],
        descriptions: [],
      };
    }

    dailyData[date].temps.push(item.main.temp);
    dailyData[date].icons.push(item.weather[0].icon);
    dailyData[date].descriptions.push(item.weather[0].description);
  });

  return Object.values(dailyData).map((day) => {
    const avgTemp =
      day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length;

    const iconCounts = {};
    day.icons.forEach((icon) => {
      iconCounts[icon] = (iconCounts[icon] || 0) + 1;
    });
    const mainIcon = Object.entries(iconCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const descCounts = {};
    day.descriptions.forEach((desc) => {
      descCounts[desc] = (descCounts[desc] || 0) + 1;
    });
    const mainDescription = Object.entries(descCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return {
      date: day.date,
      day: day.day,
      temp: Math.round(avgTemp),
      icon: mainIcon,
      description: mainDescription,
    };
  });
};
