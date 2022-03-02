/* eslint-disable consistent-return */
import {
  useEffect, useState,
} from 'react';

const useTimer = (countDown: number = 59): { timer: number, setTimer: (interval?: number) => void } => {
  const [timer, setTimer] = useState(countDown);

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return { timer, setTimer: (interval?: number) => setTimer(interval || countDown) };
};

export default useTimer;
