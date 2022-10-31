import { AutoComplete } from "../../components/AutoComplete"
import { StockList } from "../../components/StockList"
import { Logo } from "../../components/Logo"


export const OverviewPage = () => {
    return <div className="relative">
        <div className="backgroundImg"></div>
        <div className="overviewPage">
            <Logo />
            <AutoComplete />
            <div className="stockList mx-auto">
                <StockList />
            </div>
        </div>
    </div>
}
