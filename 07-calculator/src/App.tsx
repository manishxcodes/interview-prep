import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");

  const buttons = [
    "C",
    "<-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ];

  const handleClick = (value: string) => {
    console.log("value: ", value);
    if (value === "C") {
      setDisplay("0");
    } else if (value === "<-") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        const ans = eval(display).toString();
        setDisplay(ans);
      } catch (err) {
        setDisplay("Enter valid expression");
      }
    } else {
      if (display === "0") {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Calculator</h1>

        <input
          readOnly
          title="expression"
          value={display}
          className="w-full border border-neutral-200 px-4 py-2 rounded-md text-right text-lg mb-4"
        />

        <div className="grid grid-cols-4 gap-4 mx-auto">
          {buttons.map((btn) => {
            return (
              <button
                key={btn}
                className="text-center bg-neutral-100 p-3 rounded-lg hover:bg-neutral-200"
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
