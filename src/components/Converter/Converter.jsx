import "./Converter.css";

const Converter = ({
  currencies,
  selectedCurrency,
  handleOnChangeCurrency,
  amount,
  handleOnChangeAmount,
}) => {
    
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={handleOnChangeAmount}
      />
      <select value={selectedCurrency} onChange={handleOnChangeCurrency}>
        {currencies.map((currency, index) => (
          <option value={currency} key={index}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Converter;