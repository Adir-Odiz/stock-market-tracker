import { useState, useEffect } from "react"
import finnHub from "../apis/finnHub"

export const StockList = () => {
    const [stock, setStock] = useState()
    const [watchList, setWatchList] = useState(["GOOGLE", "MSFT", "AMZN"])
    
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            const responses = []
            try {
                const responses = Promise.all(finnHub.get("/quote", {
                    params: {
                        symbol: "MSFT"
                    }
                }), finnHub.get("/quote", {
                    params: {
                        symbol: "GOOGLE"
                    }
                }), finnHub.get("/quote", {
                    params: {
                        symbol: "AAPL"
                    }
                }))
                
                console.log(responses)
                if (isMounted) {
                    setStock(responses)
                }
            } catch (err) {

            }
        }
        fetchData()

        return () => (isMounted = false)
    }, [])


    return <div>Stock List</div>
}