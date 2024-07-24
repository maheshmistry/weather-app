import { Dashboard } from './components/Dashboard'
import { CityProvider } from './context/CityProvider'
import { WeatherProvider } from './context/WeatherProvider'
import weatherLogo from './assets/logo.svg'

function App() {
  return (
      <WeatherProvider>
        <CityProvider>
        <div className="mt-10 flex justify-center items-center">
        <img
          src={weatherLogo}
          alt="Search Icon"
          className="w-20 h-20 text-gray-500 ml-2 mr-1"
        />
          <div className="font-sans text-4xl lg:text-6xl">Weather App</div>
        </div>
          <Dashboard/>
        </CityProvider>
      </WeatherProvider>
  )
}

export default App
