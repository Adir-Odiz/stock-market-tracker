import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../../apis/finnHub";
import { StockChart } from "../../components/StockChart";
import { Logo } from "../../components/Logo";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: data.c[index],
    };
  });
};

export const StockDetailPage = () => {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDayAgo;
      // if statements to determine the last day of data
      // since the stock market is closed on sat-sun
      if (date.getDay() === 6) {
        // if today is saturday
        oneDayAgo = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        // if today is sunday
        oneDayAgo = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDayAgo = currentTime - 24 * 60 * 60;
      }
      const oneWeekAgo = currentTime - 7 * 24 * 60 * 60;
      const oneYearAgo = currentTime - 365 * 24 * 60 * 60;
      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDayAgo,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeekAgo,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYearAgo,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        console.log(responses);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [symbol])

  return <div className="backgroundImg">
            <Logo />
            <div>{chartData && (
                <StockChart />
            )}</div>
         </div>
}

// const chartData = {

// }
