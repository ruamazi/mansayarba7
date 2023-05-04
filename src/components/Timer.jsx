import { useEffect, useState } from "react";

const Timer = ({ setTimeOver, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOver(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    //cleanup function
    return () => clearInterval(interval);
  }, [setTimeOver, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;
