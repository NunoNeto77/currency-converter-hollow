import React, { useState, useEffect } from "react";
import "./App.css";
import Converter from "./components/Converter/Converter";

function App() {
  const API_KEY = "zsyRqI04Ar730CQWxZCtEBScGJNlWC1k";
  const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let fromAmount, toAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = fromAmount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = toAmount / exchangeRate;
  }

  const handleFromAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  const handleToAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencies([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]);

  return (
    <>
      <h1>Currency Converter</h1>
      <Converter
        currencies={currencies}
        selectedCurrency={fromCurrency}
        handleOnChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleOnChangeAmount={handleFromAmountChange}
      />

      <div className="equals">=</div>

      <Converter
        currencies={currencies}
        selectedCurrency={toCurrency}
        handleOnChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        handleOnChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
