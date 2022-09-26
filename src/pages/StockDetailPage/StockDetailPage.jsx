import { useEffect } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../../apis/finnHub"

export const StockDetailPage = () => {
    const {symbol} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            
        }
    })

    return <div>{symbol}</div>
}