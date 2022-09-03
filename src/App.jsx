import {BrowserRouter, Routes, Route} from "react-router-dom"
import { OverviewPage } from "./pages/OverviewPage/OverviewPage"
import { StockDetailPage } from "./pages/StockDetailPage/StockDetailPage"
// import { OverviewPage, StockDetailPage } from "./pages/index"

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index="/" element={<OverviewPage />} />
        <Route path="/detail/:symbol" element={<StockDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
