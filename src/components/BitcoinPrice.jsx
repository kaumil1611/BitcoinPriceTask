import React, { useState, useEffect } from "react";
import axios from "axios";

const BitcoinPrice = () => {
  const [buttonSet, setButton] = useState({
    buttonColor: "blue",
    buttonText: "Get Bitcoin Price",
  });

  const [currentPrice, setCurrentPrice] = useState(null);
  const [previousPrice, setPreviousPrice] = useState(null);
  const [showPreviousPrice, setShowPreviousPrice] = useState(false);

  const baseURL = "https://api.coindesk.com/v1/bpi/currentprice.json";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCurrentPrice(response.data.bpi.USD.rate);
    });
  }, []);

  const handleGetData = () => {
    setButton({
      buttonColor: "purple",
      buttonText: "Refresh Bitcoin Price",
    });

    const fetchData = () => {
      axios.get(baseURL).then((response) => {
        setPreviousPrice(currentPrice);
        setCurrentPrice(response.data.bpi.USD.rate);
        setShowPreviousPrice(true);
      });
    };
    fetchData();
  };

  return (
    <div>
      <button
        onClick={handleGetData}
        style={{ backgroundColor: buttonSet.buttonColor, color: "white" }}
      >
        {buttonSet.buttonText}
      </button>

      {currentPrice && <h2>Current Bitcoin price in USD: {currentPrice}</h2>}

      {showPreviousPrice && (
        <h2>Previous Bitcoin price in USD: {previousPrice}</h2>
      )}
    </div>
  );
};

export default BitcoinPrice;
