import { useEffect, useState } from "react"

interface DateTime {
    hours: string
    minutes: string
    day: string
    date: string
    month: string
}
  
export function DateTime(){
    const [dateTime, setDateTime] = useState<DateTime>({
        hours: '',
        minutes: '',
        day: '',
        date: '',
        month: '',
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date()
            const hours = now.getHours().toString().padStart(2, '0')
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const day = now.toLocaleString('default', { weekday: 'long' })
            const date = now.getDate().toString().padStart(2, '0')
            const month = now.toLocaleString('default', { month: 'long' })
            setDateTime({hours,minutes,day,date,month})
        }, 1000) 

        return () => {
            clearInterval(intervalId)
        }
  }, [])

  return (
    <div className="text-gray-800">
            <p className="text-4xl font-bold">{dateTime.hours}:{dateTime.minutes}</p>
            <p className="text-lg">{dateTime.day}, {dateTime.month} {dateTime.date}</p>
        </div>
  )
}