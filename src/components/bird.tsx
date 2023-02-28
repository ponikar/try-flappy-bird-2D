import { Image, useImage } from "@shopify/react-native-skia";
import React, { FC, useEffect, useRef, useState } from "react";
import { useBird } from "../store/bird";

interface BirdProps {}

export const Bird: FC<BirdProps> = () => {
  const { y, width, height, x } = useBird();
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
        width={width}
        height={height}
        image={goingup}
        fit="contain"
        y={y}
        x={x}
      />
    );
  }

  if (birdState === "goingdown") {
    return (
      <Image
        width={width}
        height={height}
        image={goingdown}
        fit="contain"
        y={y}
        x={x}
      />
    );
  }

  return (
    <Image
      width={width}
      height={height}
      image={ideal}
      fit="contain"
      y={y}
      x={x}
    />
  );
};
