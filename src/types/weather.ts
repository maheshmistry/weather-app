export interface WeatherData {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: {
      time: string
      interval: string
      relative_humidity_2m: string
      apparent_temperature: string
      weather_code: string
      wind_speed_10m: string
    }
    current: {
      time: string
      interval: number
      relative_humidity_2m: number
      apparent_temperature: number
      weather_code: number
      wind_speed_10m: number
    }
    hourly_units: {
      time: string
      temperature_2m: string
    }
    hourly: {
      time: string[]
      temperature_2m: number[]
    }
  }
  