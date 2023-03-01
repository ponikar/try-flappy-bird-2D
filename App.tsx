import { Canvas } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { GameBackground } from "./src/components/background";
import { Bird } from "./src/components/bird";
import { GameOver } from "./src/components/game-over";
import { GetReady, GetReadyClickArea } from "./src/components/get-ready";
import { Obstacles } from "./src/components/obstacles";
import { Pause, PauseButtonArea } from "./src/components/pause-button";
import { Score } from "./src/components/score";
import { useGameStateEffect } from "./src/hooks/useGameStateEffect";
import { useBird, useBirdActions } from "./src/store/bird";
import { useGameActions, useGameState } from "./src/store/game-state";

const BIRD_FALLING_SPEED = 300;
export default function App() {
  const { keepFalling, jump } = useBirdActions();

  const timeout = useRef(null);

  const state = useGameState();

  const timer = useGameStateEffect(keepFalling, BIRD_FALLING_SPEED);
  const gameActions = useGameActions();

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      clearTimeout(timeout.current);
    };
  }, []);

  const handlePress = () => {
    if (state === "paused") return;

    if (state === "game-over") {
      return gameActions.gameRestarted();
    }

    clearTimeout(timeout.current);
    clearInterval(timer.current);
    jump();

    timeout.current = setTimeout(() => {
      timer.current = setInterval(() => {
        keepFalling();
      }, BIRD_FALLING_SPEED);
    }, 200);
  };
  return (
    <>
      <Pressable style={{ flex: 1 }} onPress={handlePress}>
        <Canvas style={styles.container}>
          <GameBackground />
          <Obstacles />
          <Score />
          <Pause />
          <Bird />
          <GetReady />
          <GameOver />
        </Canvas>
      </Pressable>
      <PauseButtonArea />
      <GetReadyClickArea />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
