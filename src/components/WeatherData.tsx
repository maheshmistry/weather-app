import { useCity } from "../context/CityProvider"
import { useWeather } from "../context/WeatherProvider"
import { weatherCodes } from "../weatherCode"
import { WeatherCard } from "./WeatherCard"

export function WeatherData(){
    const { selectedCity } = useCity()
    const { selectedWeather } = useWeather()

    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-10">
                <div className="text-3xl">
                {selectedCity?.name}, {selectedCity?.country}
                </div>
                <div className="flex items-center justify-center">
                <span className="text-9xl font-bold temp">
                    {selectedWeather?.hourly.temperature_2m[0]}
                </span>
                <span className="text-4xl font-bold ml-1">C</span>
                </div>
                <div className="text-3xl">
                {selectedWeather?.current.weather_code !== undefined &&
                    weatherCodes[selectedWeather?.current.weather_code].toString()}
                </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap text-right justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <WeatherCard
                title="Feels Like"
                value={selectedWeather?.current.apparent_temperature}
                unit="C"
                maxBarValue={50}
                temp={true}
                />
                <WeatherCard
                title="Humidity"
                value={selectedWeather?.current.relative_humidity_2m}
                unit="%"
                maxBarValue={100}
                />
                <WeatherCard
                title="Wind"
                value={selectedWeather?.current.wind_speed_10m}
                unit="km/h"
                maxBarValue={50}
                />
            </div>
        </div>
    )
}