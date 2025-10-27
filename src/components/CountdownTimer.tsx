import { useState, useEffect } from "react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();

      if (diff <= 0) {
        return "00d 00h 00m 00s";
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${String(days).padStart(2, "0")}g ${String(hours).padStart(2, "0")}s ${String(minutes).padStart(2, "0")}d ${String(seconds).padStart(2, "0")}s`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="win95-inset bg-input p-2 text-center">
      <div className="text-xs mb-1">Listeye yeni itemler gelmesine:</div>
      <div className="font-retro text-xs text-primary">{timeLeft}</div>
    </div>
  );
};
