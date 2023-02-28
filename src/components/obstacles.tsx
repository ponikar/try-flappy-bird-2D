import { useImage, Image } from "@shopify/react-native-skia";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { useGameStateEffect } from "../hooks/useGameStateEffect";

const MAX_HEIGHT = 400;
const MIN_HEIGHT = 300;

const MAX_WIDTH = 300;
const MIN_WIDTH = 250;

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

  const onObstacleOut = (id: number) => {
    //setObstacles((o) => o.filter((obstacle) => obstacle.id !== id));
  };

  return (
    <>
      {obstacles.map((o, index) => (
        <Obstacle onObstacleOut={onObstacleOut} object={o} key={index} />
      ))}
    </>
  );
};

const Obstacle: FC<{
  object: Obstacle;
  onObstacleOut: (e: number) => void;
}> = ({ object, onObstacleOut }) => {
  const pipeUp = useImage(require("../assets/pipe-green.png"));
  const pipeDown = useImage(require("../assets/pipe-green-down.png"));
  const [x, setX] = React.useState(object.x);

  const isUnMounted = React.useRef(false);

  useGameStateEffect(() => {
    if (!isUnMounted.current) {
      setX((x) => {
        if (x < -object.width) {
          onObstacleOut(object.id);
        }
        return x - 10;
      });
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
      y={object.y}
    />
  );
};
