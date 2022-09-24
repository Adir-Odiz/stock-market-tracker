import { AutoComplete } from "../../components/AutoComplete"
import { StockList } from "../../components/StockList"


export const OverviewPage = () => {
    return <div className="relative">
        <div className="backgroundImg"></div>
        <div className="overviewPage">
            <AutoComplete />
            <div className="stockList">
                <StockList />
            </div>
        </div>
    </div>
}
