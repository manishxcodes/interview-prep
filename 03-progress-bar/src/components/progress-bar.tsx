import { useEffect, useState } from "react";
import { MAX, MIN } from "../constants";

export const ProgressBar = ({
  value,
  onComplete,
}: {
  value: number;
  onComplete: () => void;
}) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));
  }, [value]);
  if (value >= MAX) {
    onComplete();
  }

  return (
    <div className="progress">
      <span
        style={{
          color: `${percent > 47 ? "white" : "black"}`,
        }}
      >
        {percent.toFixed()}%
      </span>
      <div
        role="progressbar"
        style={{
          // width: `${percent}%`,
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
        aria-label={"progressbar"}
        aria-valuemax={MAX}
        aria-valuemin={MIN}
        aria-valuenow={percent}
      />
    </div>
  );
};
