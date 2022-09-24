import { useState, useEffect, useContext } from "react"
import finnHub from "../apis/finnHub"
import { WatchListContext } from "../context/WatchListContext"

export const AutoComplete = () => {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const {addStock} = useContext(WatchListContext)

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : null
        return (
            <ul style={{
                height: "300px",
                overflowY: "scroll",
                overflowX: "hidden",
                cursor: "pointer"
            }}className={`dropdown-menu ${dropDownClass}`}>
                {results.map((result) => {
                    return (
                        <li onClick={() => {
                            addStock(result.symbol)
                            setSearch("")
                        }} className="dropdown-item" key={result.symbol}>
                            {result.description} ({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                
                if (isMounted) {
                    setResults(response.data.result)
                }

            } catch (err) {

            }
        }
        if (search.length > 0) {
            fetchData()
        } else {
            setResults([])
        }
    }, [search])

    return <div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
            <input style={{ backgroundColor: "rgba(145, 158, 171, 0.2)", color: "rgb(255, 255, 255)" }} id="search" type="text" className="form-control" placeholder="Search" autoComplete="off" 
            value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <label style={{color: "rgb(255, 255, 255, 0.8)"}} htmlFor="search">Search for a stock symbol</label>
            {renderDropdown()}
        </div>
    </div>
}