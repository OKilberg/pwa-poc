import { useEffect, useState } from "react";

const TIME_5_SECONDS = 5 * 1000;

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_5_SECONDS);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

export default useCurrentTime;
