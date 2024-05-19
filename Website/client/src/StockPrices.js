import React, { useEffect, useState } from 'react';

const StockPrices = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/stocks')
      .then(response => response.json())
      .then(data => setStocks(data));
  }, []);

  return (
    <div>
      <h1>Stock Prices</h1>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>{stock.name}: {stock.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockPrices;
