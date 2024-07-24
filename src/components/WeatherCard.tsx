interface WeatherInfoProps {
  title: string
  value: number | undefined
  unit: string
  maxBarValue: number
  temp?: boolean
}
function progressBar(widthPerc: number = 0, gradient: boolean = false) {
    const radius = 65
    const dashArray = (Math.PI * radius * widthPerc) / 100
    return (
      <svg width="200" height="120">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="25"
          strokeLinecap="round"
          strokeDashoffset={-1 * Math.PI * radius}
          strokeDasharray={`${dashArray} 10000`}
          stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}
        ></circle>
        {gradient && (
          <defs>
            <linearGradient id="score-gradient">
              <stop offset="0%" stopColor="lightblue" />
              <stop offset="25%" stopColor="cyan" />
              <stop offset="100%" stopColor="blue" />
            </linearGradient>
          </defs>
        )}
      </svg>
    )
  }
export function WeatherCard({
  title,
  value,
  unit,
  maxBarValue,
  temp = false,
}: WeatherInfoProps){
  let barValue = 0
  if(value){
    barValue = (value * (100/maxBarValue))
  }
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md !mt-4">
      <div className="text-center font-bold text-xl">{title}</div>
      <div className="score w-52 h-32 relative overflow-hidden flex items-end justify-center">
        <div className="absolute top-2">{progressBar(100)}</div>
        <div className="z-10">{progressBar((barValue as number), true)}</div>
      </div>
  
      <span className={`text-sm relative top-[-10px] right-5 ${temp ? 'temp' : ''}`}>
        {maxBarValue}{unit}
      </span>

      <div className="text-center">
        <div className={`font-bold text-2xl inline-block ${temp ? 'temp' : ''}`}>
          {value}
        </div>
        <span className="text-base">{unit}</span>
      </div>
      
    </div>
  )
}

