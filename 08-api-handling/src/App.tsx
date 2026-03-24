import { useState } from "react";
import "./App.css";
import { useStocks } from "./hooks/useStocks";

function App() {
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);

  const { stocks, pagination } = useStocks(page, limit);
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  const goToNext = () => {
    if (pagination.nextPage) {
      setPage((p) => p + 1);
    } else {
      return;
    }
  };

  const goToPrev = () => {
    if (pagination.previousPage) {
      setPage((p) => p - 1);
    } else {
      return;
    }
  };

  console.log("stocks: ", stocks);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white p-6">
        <h1 className="text-4xl text-center">Stock Details of TATA</h1>

        {stocks.map((stock) => {
          return (
            <div
              key={stock.Symbol}
              className="px-4 py-2 shadow-sm rounded-md mt-4"
            >
              <div>
                <h1 className="font-semibold tracking-wide">{stock.Symbol}</h1>
                <p className="text-neutral-600 text-sm tracking-wide">
                  {stock.Name}
                </p>
              </div>

              <div className="flex mt-8 justify-between">
                <p>{stock.MarketCap}</p>
                <p className="text-green-400">{stock.CurrentPrice}</p>
              </div>
            </div>
          );
        })}

        <div className="flex justify-center items-center gap-2 px-4 py-2">
          <button
            onClick={goToPrev}
            disabled={!pagination.previousPage}
            className="p-2 rounded-full bg-neutral-200"
          >
            prev
          </button>

          {pages.map((p) => {
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`p-2 rounded-full ${p === page ? "bg-blue-300" : "bg-neutral-200"}`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={goToNext}
            disabled={!pagination.nextPage}
            className="p-2 rounded-full bg-neutral-200"
          >
            next
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
