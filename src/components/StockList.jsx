import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import finnHub from "../apis/finnHub"
import {FaAngleUp, FaAngleDown} from "react-icons/fa"
import { WatchListContext } from "../context/WatchListContext" // WHY NOT WORKINGGGGGGG

export const StockList = () => {
    const [stock, setStock] = useState([])
    const { watchList, deleteStock } = useContext(WatchListContext)
    const navigate = useNavigate()
    const stockColor = (change) => {
        return change > 0 ? "success" : "danger"
    }

    const directionIcon = (change) => {
        return change > 0 ? <FaAngleUp /> : <FaAngleDown />
    } 

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                
                // console.log(responses)
                const data = responses.map((response) => {
                    return {
                    data: response.data,
                    symbol: response.config.params.symbol
                    }
                })
                console.log(data)

                if (isMounted) {
                    setStock(data)
                }
            } catch (err) {
                console.log(err)

            }
        }
        fetchData()

        return () => (isMounted = false)
    }, [watchList])

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }

    return <div>
        <table className="table mt-5 mx-auto" style={{width: "70vw", textAlign: "center"}}>
            <thead style ={{ color: "rgb(139,129,152)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Change</th>
                    <th scope="col">Chg %</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Close</th>
                </tr>
            </thead>
            <tbody>
                {stock?.map((stockData) => {
                    return (
                        <tr onClick={() => handleStockSelect(stockData.symbol)} className="table-row" style={{color:"rgb(200,200,200)", cursor:"pointer", }} key={stockData.symbol}>
                            <th scope="row">{stockData.symbol}</th>
                            <td>{stockData.data.c}</td>
                            <td className={`text-${stockColor(stockData.data.d)}`}>{stockData.data.d} {directionIcon(stockData.data.d)}</td>
                            <td className={`text-${stockColor(stockData.data.d)}`}>{stockData.data.dp} {directionIcon(stockData.data.d)}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc} <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e) => {
                                e.stopPropagation()
                                deleteStock(stockData.symbol)
                            }}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
}