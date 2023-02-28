import React, { useEffect } from "react";
import { useGameState } from "../store/game-state";

export const useGameStateEffect = (callback: () => void, timeInterval: any) => {
  const gameState = useGameState();

  // initially keep the loop running
  useEffect(() => {
    timeInterval = setInterval(callback, 500);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (gameState === "paused") {
      clearInterval(timeInterval);
    } else if (gameState === "resumed") {
      timeInterval = setInterval(callback, 500);
    }
  }, [gameState]);
};
