 import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [minutes, setMinutes] = useState(10);

  useEffect(() => {
    fetchStockData();
  }, [minutes]);

  const fetchStockData = async () => {
    try {
      const res = await axios.get(
        http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=${minutes}
      );
      console.log("Stock data:", res.data);
      setStockData(res.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Nvidia Stock Price (Last {minutes} minutes)
      </h2>
      <div className="mb-4">
        <label htmlFor="minutes">Select Time Interval (minutes): </label>
        <select
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="ml-2 p-1 border rounded"
        >
          {[5, 10, 30, 50, 60].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={stockData}
          margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="lastUpdatedAt"
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
          />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleString()}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockPage;