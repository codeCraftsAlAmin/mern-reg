import React, { useEffect } from "react";

const Timer = ({ verificationExpiresAt, timeLeft, setTimeLeft }) => {
  // handle count-down timer
  useEffect(() => {
    if (!verificationExpiresAt) return;

    const timer = setInterval(() => {
      const now = new Date();
      const expTime = new Date(verificationExpiresAt);

      const secondsLeft = Math.max(0, Math.floor((expTime - now) / 1000));

      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) clearInterval(timer);
    }, 1000);
    
  }, [verificationExpiresAt]);

  // formate time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const s = (seconds % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
  };

  return (
    <div>
      <p className="text-sm text-black dark:text-white font-semibold mt-4">
        {timeLeft > 0
          ? `Code expires in ${formatTime(timeLeft)}`
          : "Code expires in 00:00"}
      </p>
    </div>
  );
};

export default Timer;
