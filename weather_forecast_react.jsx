# Weather Forecast — React (Vite + Tailwind)

This project is a complete React weather forecast app scaffolded with Vite and styled with Tailwind CSS. It fetches weather data from OpenWeatherMap (you must provide your own API key).

---

## Project structure

```
weather-forecast-react/
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ assets/
│  │  └─ logo.svg
│  ├─ components/
│  │  ├─ SearchBar.jsx
│  │  └─ WeatherCard.jsx
│  ├─ styles/
│  │  └─ main.css
│  ├─ utils/
│  │  └─ weatherApi.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ .env.example
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ vite.config.js
└─ README.md
```

---

## Important notes
- Replace `VITE_OPENWEATHER_API_KEY` in a `.env` file at project root with your OpenWeatherMap API key.
- The app uses the OpenWeatherMap Current Weather and 5-day forecast APIs.

---

## Files (copy each into your project at the path shown)

---

### package.json

```json
{
  "name": "weather-forecast-react",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^4.2.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

### vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

### postcss.config.cjs

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### tailwind.config.cjs

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

### .env.example

```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

---

### public/favicon.ico

(You can place any favicon; not required to run.)

---

### src/main.jsx

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### public/index.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather Forecast</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
}

body {
  @apply bg-slate-50 text-slate-800;
}
```

---

### src/styles/main.css

```css
/* Extra custom styles (optional) */
.container-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### src/utils/weatherApi.js

```js
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function fetchCurrentWeatherByCity(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  const res = await axios.get(url)
  return res.data
}

export async function fetchForecastByCity(city) {
  // 5 day / 3 hour forecast
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  const res = await axios.get(url)
  return res.data
}

export async function fetchCurrentWeatherByCoords(lat, lon) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  const res = await axios.get(url)
  return res.data
}
```

---

### src/components/SearchBar.jsx

```jsx
import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!q) return
    onSearch(q.trim())
    setQ('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2 w-full max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Enter city (e.g., London)"
        className="flex-1 px-4 py-2 rounded-md border border-slate-200 shadow-sm focus:outline-none"
      />
      <button className="px-4 py-2 bg-sky-600 text-white rounded-md">Search</button>
    </form>
  )
}
```

---

### src/components/WeatherCard.jsx

```jsx
import React from 'react'

function kToC(k) {
  return (k - 273.15).toFixed(1)
}

export default function WeatherCard({ data }) {
  if (!data) return null
  const { name, sys, weather, main, wind } = data
  const icon = weather?.[0]?.icon
  const description = weather?.[0]?.description
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{name}, {sys?.country}</h2>
          <p className="capitalize">{description}</p>
        </div>
        {icon && (
          <img
            alt={description}
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            className="w-24 h-24"
          />
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-slate-500">Temperature</div>
          <div className="text-xl font-medium">{main?.temp} °C</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Feels like</div>
          <div className="text-xl font-medium">{main?.feels_like} °C</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Humidity</div>
          <div className="text-xl font-medium">{main?.humidity}%</div>
        </div>
      </div>

      <div className="mt-4 flex gap-6 text-sm text-slate-600">
        <div>Wind: {wind?.speed} m/s</div>
        <div>Pressure: {main?.pressure} hPa</div>
      </div>
    </div>
  )
}
```

---

### src/App.jsx

```jsx
import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { fetchCurrentWeatherByCity, fetchCurrentWeatherByCoords } from './utils/weatherApi'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // try to get user's location once on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          setLoading(true)
          const data = await fetchCurrentWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          setWeather(data)
        } catch (err) {
          // ignore silently
        } finally {
          setLoading(false)
        }
      })
    }
  }, [])

  async function handleSearch(q) {
    setError('')
    setLoading(true)
    try {
      const data = await fetchCurrentWeatherByCity(q)
      setWeather(data)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || 'Could not fetch weather')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Weather Forecast</h1>
          <p className="text-sm text-slate-500 mt-1">Search current weather by city or use your location</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-6">
          {loading && <div className="text-slate-500">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {weather && <WeatherCard data={weather} />}
        </div>
      </div>
    </div>
  )
}
```

---

### README.md

```md
# Weather Forecast — React (Vite + Tailwind)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file in project root based on `.env.example` and add your OpenWeatherMap API key:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

3. Run the dev server:

```bash
npm run dev
```

Open http://localhost:5173 (or the URL printed by Vite).

## Notes
- This app uses the OpenWeatherMap API. If you want forecasts (multi-day), extend `utils/weatherApi.js` to parse the /forecast endpoint and add a component to display it.
- You can easily style this further with Tailwind classes.
```

---

That's everything — the full project scaffold and code are included above. Copy the files into their respective paths, run `npm install`, create a `.env` with your OpenWeatherMap API key, and run `npm run dev`.
