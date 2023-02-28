import { useImage, Image } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";

const { width: screenWidth } = Dimensions.get("screen");
export const Pause = () => {
  const image = useImage(require("../assets/pause.png"));

  if (!image) return null;

  return (
    <Image
      image={image}
      width={90}
      height={90}
      fit="contain"
      y={30}
      x={screenWidth - 90}
    />
  );
};
