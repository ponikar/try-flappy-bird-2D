import { useImage, Image } from "@shopify/react-native-skia";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { useGameOver } from "../hooks/useGameOver";
import { useGameOverEffect } from "../hooks/useGameOverEffect";
import { useGameStateEffect } from "../hooks/useGameStateEffect";
import { useGameActions } from "../store/game-state";

const MAX_HEIGHT = 400;
const MIN_HEIGHT = 300;

const MAX_WIDTH = 75;
const MIN_WIDTH = 50;

interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;

  type: "light" | "dark";
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const Obstacles = () => {
  const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);

  const generateObstacles = () => {
    setObstacles((o) => {
      const height = Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT;
      return [
        ...o,
        {
          id: new Date().getMilliseconds(),
          y: Math.floor(Math.random() * 2) === 1 ? 0 : screenHeight - height,
          x: screenWidth + 150,
          width: Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH,
          height,
          type: "light",
        },
      ];
    });
  };
  useGameStateEffect(generateObstacles, 2000);
  useGameOverEffect(() => setObstacles([]));

  return (
    <>
      {obstacles.map((o, index) => (
        <Obstacle object={o} key={index} />
      ))}
    </>
  );
};

const Obstacle: FC<{
  object: Obstacle;
}> = ({ object }) => {
  const pipeUp = useImage(require("../assets/pipe-green.png"));
  const pipeDown = useImage(require("../assets/pipe-green-down.png"));
  const [x, setX] = React.useState(object.x);

  useGameOver({
    x,
    y: object.y,
    width: object.width,
    height: object.height,
  });

  const isUnMounted = React.useRef(false);

  useGameStateEffect(() => {
    if (!isUnMounted.current) {
      setX((x) => x - 10);
    }
  }, 100);

  React.useEffect(() => {
    return () => {
      isUnMounted.current = true;
    };
  }, []);

  if (!pipeDown || !pipeUp) return null;

  return (
    <Image
      image={object.y !== 0 ? pipeUp : pipeDown}
      width={object.width}
      height={object.height}
      x={x}
      fit="fill"
      y={object.y}
    />
  );
};
