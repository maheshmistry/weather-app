import { useEffect, useRef, useState } from "react"
import { City } from "../types/city"
import weather from "../api/weather"
import { useCity } from "../context/CityProvider"
import { useWeather } from "../context/WeatherProvider"
import SearchIcon from '../assets/search-icon.svg'
import { CircleFlag } from "react-circle-flags"
import { WeatherData } from "../types/weather"

const CACHE_EXP_TIME = 3600 * 1000; // 1 hour

export function Searchbar(){
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [cities, setCities] = useState<City[] | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { setSelectedCity } = useCity()
    const { setSelectedWeather } = useWeather()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const cachedResults = localStorage.getItem("searchResults");
        if (cachedResults) {
            const cachedData = JSON.parse(cachedResults);
            const now = new Date().getTime();
            for (const key in cachedData) {
                if (now - cachedData[key].timestamp > CACHE_EXP_TIME) {
                    delete cachedData[key];
                }
            }
            localStorage.setItem("searchResults", JSON.stringify(cachedData));
        }
    }, []);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value
        setSearchQuery(searchTerm)
        if(!searchTerm) return

        const cachedResults = localStorage.getItem("searchResults");
        if (cachedResults) {
            const cachedData = JSON.parse(cachedResults);
            if (cachedData[searchTerm]) {
                setCities(cachedData[searchTerm].data);
                setDropdownOpen(true);
                return;
            }
        }

        const cities = await (await weather.getCityDetails(searchTerm)).json();
        setCities(cities.results as City[]);

        setDropdownOpen(true)

        const updatedResults = {
            timestamp: new Date().getTime(),
            data: cities.results
        };
        localStorage.setItem("searchResults", JSON.stringify({
            ...JSON.parse(cachedResults || "{}"),
            [searchTerm]: updatedResults
        }));
    }

    async function handleSelectedCity(city: City) {
        setSelectedCity(city);
    
        const cachedWeatherData = JSON.parse(localStorage.getItem("weatherData") || "{}");
        const cachedCityWeather = cachedWeatherData[city.id];
    
        if (cachedCityWeather && !isWeatherDataExpired(cachedCityWeather.timestamp)) {
            setSelectedWeather(cachedCityWeather.data);
        } else {
            const newWeatherData = await (await weather.getCurrentWeather(city.latitude, city.longitude)).json();
            setSelectedWeather(newWeatherData as WeatherData);
    
            cachedWeatherData[city.id] = {
                timestamp: new Date().getTime(),
                data: newWeatherData
            };
            localStorage.setItem("weatherData", JSON.stringify(cachedWeatherData));
        }
    
        setSearchQuery("");
        setDropdownOpen(false);
    }
    
    function isWeatherDataExpired(timestamp: number) {
        const currentHour = new Date().getHours();
        const cachedHour = new Date(timestamp).getHours();
        return currentHour !== cachedHour;
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && inputRef.current !== event.target) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleInputClick = () => {
        if (searchQuery) {
            setDropdownOpen(true)
        }
    }

    // const handleSearch = () => {
    //     console.log(searchQuery)
    // }

    return (
        <>
            <div className="relative">
                <div className="flex items-center border-b border-gray-700 focus-within:border-blue-500">
                    <img
                        src={SearchIcon}
                        alt="Search Icon"
                        className="w-6 h-6 text-gray-500 ml-2 mr-1"
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a city..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onClick={handleInputClick}
                        className="outline-none bg-transparent p-2 flex-grow text-gray-800 placeholder-gray-500 min-w-60"
                    />
                    {/* <button onClick={handleSearch}>Search</button> */}
                </div>
                {dropdownOpen && cities && (
                <div ref={dropdownRef} className="absolute z-10 mt-1 bg-white rounded-md shadow-lg right-0 left-0 border border-gray-200 bg-opacity-90">
                    {cities.map((city) => (
                        <div key={city.id} onClick={() => handleSelectedCity(city)} className="p-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center">
                            <CircleFlag countryCode={city.country_code.toLowerCase()} height="35" className="w-8 h-8 rounded-full mr-3"/>
                            <p>{city.name}</p>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </>
    )
}
