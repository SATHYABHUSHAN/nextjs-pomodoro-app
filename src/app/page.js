"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // New state variable to track if timer is finished

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
      setIsFinished(true); // Set the finished state to true when the timer reaches zero
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setIsFinished(false); // Reset the finished state when starting
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsFinished(false); // Reset the finished state when resetting
    setTime(1500); // Reset to 25 minutes
  };

  const handleClose = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsFinished(false); // Reset the finished state when closing
    setTime(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (time / 1500) * circumference;

  return (
    <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-pink-500 to-violet-600">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl">SonicBreak</h1>
        <h2 className="text-5xl mt-4">
          {isFinished ? "Time's Up" : formatTime(time)}
        </h2>
      </div>
      <div className="relative mt-10">
        <svg className="w-32 h-32">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className="text-green-500"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-2xl">{formatTime(time)}</h2>
        </div>
      </div>
      <div className="flex mt-10 space-x-4">
        {!isActive && !isPaused ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleStart}
          >
            Play
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleResume}
              >
                Resume
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={handlePause}
              >
                Pause
              </button>
            )}
          </>
        )}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </main>
  );
}
