# Weatherly

A clean, modern, and responsive weather web application built with HTML, CSS, and JavaScript. Weatherly fetches live weather information from the OpenWeatherMap API based on user-provided city, country, and API key.

## Features

- Enter a **city** and **country** to look up current weather
- Provide your own **OpenWeatherMap API key** through the web interface (not hard-coded)
- Displays:
  - Location name
  - Current temperature (in Celsius)
  - Weather condition
  - Weather icon
- Additional weather data:
  - Feels-like temperature
  - Humidity
  - Atmospheric pressure
  - Wind speed
  - Visibility
  - Cloud cover
- Clear, user-friendly error messages for:
  - Invalid or missing inputs
  - Invalid API key
  - Location not found
  - Network/request failures
- Fully responsive design for mobile, tablet, and desktop

## Project Structure

```
Weather App/
├── index.html      -- Page structure and layout
├── style.css       -- Styling (clean, modern, minimalist, responsive)
├── script.js       -- App logic, API calls, and error handling
└── README.md       -- This file
```

## How to Run

1. **Open the app:**  
   Open `index.html` in your web browser. Since this is a static web application, no server is required. You can simply double-click the file or right-click and choose "Open with" your preferred browser.

   Alternatively, to avoid any CORS-related prompts, you can serve the directory with a local development server:

   ```bash
   npx serve .
   ```

   Then open `http://localhost:3000` (or the URL shown in the terminal).

2. **Get an OpenWeatherMap API key:**  
   Visit [https://openweathermap.org](https://openweathermap.org) and sign up for a free account. Your free API key can be found in your account dashboard under the "API keys" tab.

3. **Use the app:**
   - Enter the **city** you want the weather for (e.g., `London`)
   - Enter the **country code** (e.g., `GB`)
   - Paste your **OpenWeatherMap API key** into the API Key field
   - Click **Get Weather**

## Notes

- The free OpenWeatherMap API tier may take a few minutes to activate a newly created API key.
- Country codes should be the two-letter ISO 3166 code (e.g., `US`, `GB`, `CA`, `DE`, `FR`).
- Temperatures are displayed in Celsius (metric units).
- Weather icons are provided by OpenWeatherMap.

## Technologies Used

- **HTML5** – Semantic markup
- **CSS3** – Flexbox, Grid, CSS variables, responsive media queries
- **JavaScript (ES6+)** – Fetch API for asynchronous HTTP requests
- **OpenWeatherMap API** – `https://api.openweathermap.org/data/2.5/weather`
