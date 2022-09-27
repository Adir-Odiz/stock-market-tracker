import { useEffect } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../../apis/finnHub"

export const StockDetailPage = () => {
    const {symbol} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime()/1000)
            let oneDayAgo;
                    // if statements to determine the last day of data
                    // since the stock market is closed on sat-sun
            if (date.getDay() === 6) {             // if today is saturday
                oneDayAgo = currentTime - 2*24*60*60;
            } else if (date.getDay() === 0) {      // if today is sunday
                oneDayAgo = currentTime - 3*24*60*60;
            }
            else {
                oneDayAgo = currentTime - 24*60*60; 
            }
            const oneWeekAgo = currentTime - 7*24*60*60
            const oneYearAgo = currentTime - 365*24*60*60
            const responseDay = await finnHub.get("/stock/candle", {
                params: {
                    symbol, 
                    from: oneDayAgo, 
                    to: currentTime, 
                    resolution: 30
                }
            })
            const responseWeek = await finnHub.get("/stock/candle", {
                params: {
                    symbol, 
                    from: oneWeekAgo, 
                    to: currentTime, 
                    resolution: 60
                }
            })
            const responseYear = await finnHub.get("/stock/candle", {
                params: {
                    symbol, 
                    from: oneYearAgo, 
                    to: currentTime, 
                    resolution: "W"
                }
            })
            console.log(responseDay)
            console.log(responseWeek)
            console.log(responseYear)
        }
        fetchData()
    }, [])

    return <div>{symbol}</div>
}