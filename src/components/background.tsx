import { Image, useImage } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const GameBackground = () => {
  const imageBackground = useImage(require("../assets/background-day.png"));

  if (!imageBackground) return null;
  return (
    <Image image={imageBackground} width={width} height={height} fit="cover" />
  );
};
