import { ReactNode, createContext, useContext, useState } from 'react'
import { WeatherData } from '../types/weather'

interface WeatherContextType {
  selectedWeather: WeatherData | null
  setSelectedWeather: (Weather: WeatherData | null) => void
}


interface WeatherProviderProps {
  children: ReactNode;
}

const WeatherContext = createContext<WeatherContextType>({
  selectedWeather: null,
  setSelectedWeather: () => {},
})

export const useWeather = () => useContext(WeatherContext)


export function WeatherProvider({children}:WeatherProviderProps){
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null)
  return (
    <WeatherContext.Provider value={{ selectedWeather, setSelectedWeather }}>
      {children}
    </WeatherContext.Provider>
  )
}
