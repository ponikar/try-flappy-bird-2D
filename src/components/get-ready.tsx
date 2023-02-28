import { Box, Image, useImage } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, Pressable } from "react-native";
import { useGameActions, useGameState } from "../store/game-state";

const { width, height } = Dimensions.get("screen");

export const GetReady = () => {
  const image = useImage(require("../assets/message.png"));
  const state = useGameState();
  if (!image || state !== "ideal") return null;
  return (
    <Image
      image={image}
      width={width / 2}
      height={height / 2}
      fit="contain"
      y={height / 5}
      x={width / 2 - 100}
    />
  );
};

export const GetReadyClickArea = () => {
  const actions = useGameActions();

  const state = useGameState();

  const onPress = () => {
    actions.gameStarted();
  };

  if (state !== "ideal") return null;
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        left: width / 4,
        top: height / 5,
        width: width / 2,
        height: height / 2,
        zIndex: 2,
        opacity: 0,
      }}
    />
  );
};
