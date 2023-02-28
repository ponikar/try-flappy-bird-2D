import { Image, useImage } from "@shopify/react-native-skia";
import React, { FC, useEffect, useRef, useState } from "react";

interface BirdProps {
  y: number;
}

const BirdX = 100;

export const Bird: FC<BirdProps> = ({ y = 0 }) => {
  const ideal = useImage(require("../assets/bluebird-midflap.png"));
  const goingdown = useImage(require("../assets/bluebird-downflap.png"));
  const goingup = useImage(require("../assets/bluebird-upflap.png"));

  const [birdState, setBirdState] = useState<"ideal" | "goingup" | "goingdown">(
    "ideal"
  );

  const posYRef = useRef(0);

  useEffect(() => {
    if (y < posYRef.current) {
      setBirdState("goingup");
    } else if (y > posYRef.current) {
      setBirdState("goingdown");
    } else {
      setBirdState("ideal");
    }
    posYRef.current = y;
  }, [y]);

  if (!ideal) return null;

  if (birdState === "goingup") {
    return (
      <Image
        width={60}
        height={60}
        image={goingup}
        fit="contain"
        y={y}
        x={BirdX}
      />
    );
  }

  if (birdState === "goingdown") {
    return (
      <Image
        width={55}
        height={55}
        image={goingdown}
        fit="contain"
        y={y}
        x={BirdX}
      />
    );
  }

  return (
    <Image width={50} height={50} image={ideal} fit="contain" y={y} x={BirdX} />
  );
};
