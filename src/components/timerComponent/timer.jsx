import React, { useState, useEffect } from 'react';

function Timer({ start = 10 }) {
  const [timeLeft, setTimeLeft] = useState(start);

  useEffect(() => {
    if (timeLeft <= 0) return; // stop if time is up

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    // Cleanup on unmount or when timeLeft changes
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return <div>Time left: {timeLeft} seconds</div>;
}

export default Timer;
