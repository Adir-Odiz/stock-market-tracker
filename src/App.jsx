import {BrowserRouter, Routes, Route} from "react-router-dom"
import { OverviewPage } from "./pages/OverviewPage/OverviewPage"
import { StockDetailPage } from "./pages/StockDetailPage/StockDetailPage"
// import { OverviewPage, StockDetailPage } from "./pages/index"
import { WatchListContextProvider } from "./context/WatchListContext"
import './App.css'

function App() {
  return (
    <WatchListContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index="/" element={<OverviewPage />} />
          <Route path="/detail/:symbol" element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </WatchListContextProvider>
  )
}

export default App
