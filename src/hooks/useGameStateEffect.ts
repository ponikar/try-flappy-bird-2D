import React, { useEffect, useRef } from "react";
import { useGameState } from "../store/game-state";

export const useGameStateEffect = (
  callback: () => void,
  timer: number = 500
) => {
  const gameState = useGameState();
  const timeInterval = useRef<NodeJS.Timeout>();

  // initially keep the loop running
  useEffect(() => {
    timeInterval.current = setInterval(callback, timer);
    return () => clearInterval(timeInterval.current);
  }, []);

  useEffect(() => {
    if (gameState === "paused") {
      clearInterval(timeInterval.current);
    } else if (gameState === "resumed") {
      timeInterval.current = setInterval(callback, timer);
    }
  }, [gameState]);

  return timeInterval;
};
