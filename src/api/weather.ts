async function getCityDetails(city:string): Promise<Response> {
    return fetch('https://geocoding-api.open-meteo.com/v1/search?name='+city+'&count=5&language=en&format=json')       
}

async function getCurrentWeather(latitude: number, longitude: number): Promise<Response> {
    return fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&current=relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1&forecast_hours=6')
    }

export default{
    getCityDetails,
    getCurrentWeather
}