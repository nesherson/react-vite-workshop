import { ChangeEvent, MouseEvent, useState } from "react";
import "./App.css";

import NumericInput from "./components/NumericInput";
import CustomButton from "./components/CustomButton";

function isNegativeValue(value: number): boolean {
  return value < 0;
}

class HistoryValue {
  action: string;
  value: number;

  constructor(action: string, value: number) {
    this.action = action;
    this.value = value;
  }

  getText() {
    if (this.action === "add") return `Added value: ${this.value}`;
    else if (this.action === "remove") return `Removed value: ${this.value}`;
    else if (this.action === "clear") return `Cleared`;
    else if (this.action === "reuse") return `Reused value: ${this.value}`;
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [negativeFlag, setNegativeFlag] = useState(false);
  const [usedValues, setUsedValues] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryValue[]>([]);

  const handleAddCount = (value: number, isValueReused: boolean = false) => {
    if (value === 0) return;

    setCount((prevCount) => prevCount + value);
    if (isValueReused) {
      addActionToHistory("reuse", value);
    } else {
      addValueToUsedValues(value);
      addActionToHistory("add", value);
    }
    setNegativeFlag(false);
  };

  const handleIncrementCount = () => {
    setCount((prevCount) => prevCount + 1);
    setNegativeFlag(false);
    addActionToHistory("add", 1);
  };

  const handleDecrementCount = () => {
    if (isNegativeValue(count - 1)) {
      setNegativeFlag(true);
      return;
    }

    setCount((prevCount) => prevCount - 1);
    setNegativeFlag(false);
    addActionToHistory("remove", 1);
  };

  const handleRemoveCount = (value: number) => {
    if (isNegativeValue(count - value)) {
      setNegativeFlag(true);
      return;
    }

    setCount((prevCount) => prevCount - value);
    setNegativeFlag(false);
    addActionToHistory("remove", value);
  };

  const handleValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setValue(0);
    setCount(0);
    setUsedValues([]);
    setNegativeFlag(false);
    addActionToHistory("clear", value);
  };

  const addValueToUsedValues = (value: number) => {
    const existingUsedValues = [...usedValues];
    if (existingUsedValues.length === 5) {
      existingUsedValues.shift();
    }
    existingUsedValues.push(value);
    setUsedValues(existingUsedValues);
  };

  const addActionToHistory = (action: string, value: number) => {
    const existingHistory = [...history];
    existingHistory.push(new HistoryValue(action, value));
    setHistory(existingHistory);
  };

  return (
    <div className="App">
      <section>
        <div className="card">
          <div>
            <h2 className={`${negativeFlag ? "warning" : ""}`}>
              Count: {count}
            </h2>
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
              {usedValues.map((uv) => (
                <CustomButton
                  text={uv.toString()}
                  onClick={() => handleAddCount(uv, true)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2>History</h2>
        <ul className="history-list">
          {history.map((h) => (
            <li>
              {h.getText()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
