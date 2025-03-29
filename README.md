# 🌦️ Weather Dashboard

A modern, responsive weather dashboard application built with React that allows users to search for any city and view its current weather information and forecasts.

![Weather Dashboard Preview](https://via.placeholder.com/800x400?text=Weather+Dashboard+Preview)

## ✨ Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **5-Day Weather Forecast**: View weather predictions for the next 5 days
- **Hourly Forecast**: Check detailed hourly forecasts
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Geolocation Support**: Get weather for your current location with one click
- **Recent Search History**: Quickly access your last 5 searched locations
- **Dark/Light Theme Toggle**: Choose your preferred visual theme
- **Weather Animations**: Dynamic animations based on current weather conditions
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **City Suggestions**: Get city suggestions as you type
- **Error Handling**: User-friendly error messages for invalid cities or API issues

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **State Management**: React Hooks and Context API
- **Styling**:
  - Tailwind CSS for utility-first styling
  - Framer Motion for animations
- **Icons**: Lucide React for beautiful UI icons
- **API Integration**: OpenWeatherMap API
- **HTTP Client**: Native Fetch API
- **Deployment**: [Vercel/Netlify/GitHub Pages]

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or later)
- npm
- OpenWeatherMap API key (free tier available)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🔌 API Integration

This project uses the OpenWeatherMap API to fetch weather data:

- **Current Weather API**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast API**: `https://api.openweathermap.org/data/2.5/forecast`

### Rate Limits (Free Plan)

- 60 calls per minute
- 1,000,000 calls per month

### API Key Setup

1. Register for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. New API keys may take a few hours to activate
3. Store your API key in the `.env` file as described in the setup instructions

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Shared components like loaders, animations
│   ├── weather/             # Weather-specific components
│   └── ThemeToggle.jsx      # Dark/light theme toggle functionality
├── services/
│   └── weatherService.js    # API integration and data processing
├── styles/                  # Global styles and Tailwind config
├── App.jsx                  # Main application component
└── main.jsx                 # Application entry point
```

## 🧪 Development

For local development:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The Weather Dashboard is fully responsive and optimized for:

- Mobile devices (portrait and landscape)
- Tablets
- Desktops and large displays

The layout automatically adjusts based on the screen size to provide the best user experience on any device.



## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations