import { useImage, Image } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { useGameState } from "../store/game-state";

const { width, height } = Dimensions.get("screen");
export const GameOver = () => {
  const image = useImage(require("../assets/gameover.png"));

  const state = useGameState();

  if (!image) return null;
  if (state !== "game-over") return;
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
