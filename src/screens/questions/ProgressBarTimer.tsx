import React, { useEffect, useState } from "react";

const ProgressBarTimer: React.FC<{ 
  duration: number; 
  onComplete?: () => void;
  shouldResetOnDurationChange?: boolean;
}> = ({
  duration,
  onComplete,
  shouldResetOnDurationChange = true,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when duration changes (new question) - only if shouldResetOnDurationChange is true
  useEffect(() => {
    if (shouldResetOnDurationChange) {
      setTimeLeft(duration);
    }
  }, [duration, shouldResetOnDurationChange]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",}}>
    <div
      style={{
        width: "90%",
        height: "30px",
        backgroundColor: "#444",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "red",
          transition: "width 1s linear",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {timeLeft} seconds left
      </span>
    </div>
    </div>
  );
};

export default ProgressBarTimer;