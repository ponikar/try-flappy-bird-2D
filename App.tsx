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
import { useGameState } from "./src/store/game-state";

export default function App() {
  const { keepFalling, jump } = useBirdActions();

  const timeout = useRef(null);

  const state = useGameState();

  const timer = useGameStateEffect(keepFalling, 700);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      clearTimeout(timeout.current);
    };
  }, []);

  const handlePress = () => {
    if (state === "paused" || state === "game-over") return;

    clearTimeout(timeout.current);
    clearInterval(timer.current);
    jump();

    timeout.current = setTimeout(() => {
      timer.current = setInterval(() => {
        keepFalling();
      }, 700);
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
