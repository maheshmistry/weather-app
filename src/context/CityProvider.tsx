import { ReactNode, createContext, useContext, useState } from 'react'
import { City } from '../types/city'

interface CityContextType {
  selectedCity: City | null
  setSelectedCity: (city: City | null) => void
}

const CityContext = createContext<CityContextType>({
  selectedCity: null,
  setSelectedCity: () => { },
})

interface CityProviderProps {
  children: ReactNode;
}

export const useCity = () => useContext(CityContext)

export function CityProvider({children}:CityProviderProps){
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  )
}
