import { useCity } from "../context/CityProvider"
import { useWeather } from "../context/WeatherProvider"
import { DateTime } from "./DateTime"
import { Searchbar } from "./Searchbar"
import { WeatherData } from "./WeatherData"

export function Dashboard(){
    const { setSelectedCity } = useCity()
    const { selectedWeather, setSelectedWeather } = useWeather()

    async function handleClearCity(){
        setSelectedCity(null)
        setSelectedWeather(null)
    }

    return (
        <div className="w-full p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                <div className="flex justify-center items-center">
                    <DateTime />
                </div>        
                <div className="mt-4 md:mt-0 md:ml-auto flex flex-col md:flex-row items-center space-x-4 flex-col-reverse">
                    <button onClick={handleClearCity} className="p-2 max-md:mt-5 rounded text-red-400 hover:text-orange-700 focus:outline-none">Clear City</button>
                    <Searchbar />
                </div>
            </div>
            {selectedWeather && (<WeatherData/>)}
        </div>
    )
}