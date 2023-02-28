import { Canvas } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { GameBackground } from "./src/components/background";
import { Bird } from "./src/components/bird";
import { Obstacles } from "./src/components/obstacles";
import { Pause, PauseButtonArea } from "./src/components/pause-button";
import { Score } from "./src/components/score";
import { useGameStateEffect } from "./src/hooks/useGameStateEffect";
import { useGameState } from "./src/store/game-state";

export default function App() {
  const [y, setY] = useState(0);

  const timeout = useRef(null);

  const state = useGameState();

  const keepBirdDown = () => {
    setY((y) => y + 40);
  };

  const timer = useGameStateEffect(keepBirdDown, 700);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      clearTimeout(timeout.current);
    };
  }, []);

  const handlePress = () => {
    if (state === "paused") return;

    clearTimeout(timeout.current);
    clearInterval(timer.current);
    setY((y) => {
      if (y > 0) {
        return y - 40;
      }
      return y;
    });

    timeout.current = setTimeout(() => {
      timer.current = setInterval(() => {
        keepBirdDown();
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
          <Bird y={y} />
        </Canvas>
      </Pressable>
      <PauseButtonArea />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
