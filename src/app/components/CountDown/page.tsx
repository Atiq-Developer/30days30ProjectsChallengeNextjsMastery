"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Stop the timer when it reaches 0
    }
    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [isRunning, timeLeft]);

  const handleSet = () => {
    const duration = parseInt(inputValue, 10);
    if (!isNaN(duration) && duration > 0) {
      setTimeLeft(duration);
      setInputValue("");
    }
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md md:max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Countdown Timer</h1>

        {/* Input Field and Set Button */}
        <div className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0">
          <input
            type="number"
            placeholder="Enter duration in seconds"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSet}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 md:ml-2"
          >
            Set
          </button>
        </div>

        {/* Countdown Display */}
        <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-28"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-28"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-28"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
