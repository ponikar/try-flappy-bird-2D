import { useImage, Image } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, Pressable, TouchableOpacity } from "react-native";
import { useGameActions, useGameState } from "../store/game-state";

const { width: screenWidth } = Dimensions.get("screen");
export const Pause = () => {
  const pause = useImage(require("../assets/pause.png"));
  const play = useImage(require("../assets/play.png"));

  const state = useGameState();
  if (!pause || !play) return null;

  if (state === "ideal")
    return (
      <Image
        image={pause}
        width={50}
        height={50}
        fit="contain"
        y={50}
        x={screenWidth - 65}
      />
    );

  return (
    <Image
      image={play}
      width={70}
      height={70}
      fit="contain"
      y={40}
      x={screenWidth - 75}
    />
  );
};

export const PauseButtonArea = () => {
  const gameActions = useGameActions();
  const state = useGameState();

  const onPress = () => {
    if (state === "paused") {
      gameActions.gameResumed();
    } else {
      gameActions.gamePaused();
    }
  };

  return (
    <Pressable
      style={{
        width: 65,
        height: 65,
        position: "absolute",
        zIndex: 2,
        right: 15,
        top: 45,
        opacity: 0.5,
      }}
      onPress={onPress}
    />
  );
};
