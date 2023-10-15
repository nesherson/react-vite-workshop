import { ChangeEvent, MouseEvent, useState } from "react";
import "./App.css";

import NumericInput from "./components/NumericInput";
import CustomButton from "./components/CustomButton";

function isNegativeValue(value: number): boolean {
  return value < 0;
}

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [negativeFlag, setNegativeFlag] = useState(false);
  const [valueHistory, setValueHistory] = useState<number[]>([]);

  const handleAddCount = (value: number, skipHistory: boolean = false) => {
    if (value === 0) return;

    setCount((prevCount) => prevCount + value);
    if (!skipHistory) {
      addValueToHistory(value);
    }
    setNegativeFlag(false);
  };

  const handleIncrementCount = () => {
    setCount((prevCount) => prevCount + 1);
    setNegativeFlag(false);
  };

  const handleDecrementCount = () => {
    if (isNegativeValue(count - 1)) {
      setNegativeFlag(true);
      return;
    }

    setCount((prevCount) => prevCount - 1);
    setNegativeFlag(false);
  };

  const handleRemoveCount = (value: number) => {
    if (isNegativeValue(count - value)) {
      setNegativeFlag(true);
      return;
    }

    setCount((prevCount) => prevCount - value);
    setNegativeFlag(false);
  };

  const handleValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setValue(0);
    setCount(0);
    setValueHistory([]);
  }

  const addValueToHistory = (value: number) => {
    const existingHistory = [...valueHistory];
    if (existingHistory.length === 5) {
      existingHistory.shift();
    }
    existingHistory.push(value);
    setValueHistory(existingHistory);
  };

  return (
    <div className="App">
      <div className="card">
        <div>
          <h2 className={`${negativeFlag ? "warning" : ""}`}>Count: {count}</h2>
        </div>
        <div className="card-body">
          <NumericInput
            value={value}
            onChange={handleValueOnChange}
            className="mb-5"
          />
          <div className="d-flex-spc-even">
            <CustomButton
              text="Add"
              onClick={() => handleAddCount(value)}
              className="btn-primary-ghost"
            />
            <CustomButton
              text="Remove"
              onClick={() => handleRemoveCount(value)}
              className="btn-danger-ghost"
            />
            <CustomButton
              text="+1"
              onClick={handleIncrementCount}
              className="btn-primary-ghost"
            />
            <CustomButton
              text="-1"
              onClick={handleDecrementCount}
              className="btn-danger-ghost"
            />
            <CustomButton
              text="Clear"
              onClick={handleClear}
              className="btn-danger-ghost"
            />
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex-spc-even">
            {valueHistory.map((v) => (
              <CustomButton
                text={v.toString()}
                onClick={() => handleAddCount(v, true)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
