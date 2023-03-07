import { Image, SkImage, useImage } from "@shopify/react-native-skia";
import React, { FC, memo } from "react";
import { useGameOverEffect } from "../hooks/useGameOverEffect";
import { useGameStateEffect } from "../hooks/useGameStateEffect";

const CacheImages: Record<string, SkImage> = {};

export const Score = () => {
  const [currentScore, setCurrentScore] = React.useState(0);

  useGameStateEffect(() => setCurrentScore((oldScore) => oldScore + 20));

  useGameOverEffect(() => {
    setCurrentScore((score) => {
      // store the score somewhere

      return 0;
    });
  });

  const digits = currentScore
    .toString()
    .split("")
    .map((digit) => Number(digit));

  return (
    <>
      {digits.map((digit, index) => {
        if (CacheImages[digit]) {
          return (
            <Image
              image={CacheImages[digit]}
              y={60}
              key={index}
              x={(index + 0.5) * 20}
              width={25}
              height={25}
              fit="contain"
            />
          );
        }

        return <Digit digit={digit} key={index} index={index} />;
      })}
    </>
  );
};

const DigitImages: Record<number, typeof require> = {
  0: require("../assets/0.png"),
  1: require("../assets/1.png"),
  2: require("../assets/2.png"),
  3: require("../assets/3.png"),
  4: require("../assets/4.png"),
  5: require("../assets/5.png"),
  6: require("../assets/6.png"),
  7: require("../assets/7.png"),
  8: require("../assets/8.png"),
  9: require("../assets/9.png"),
};

const Digit: FC<{ digit: number; index: number }> = memo(({ digit, index }) => {
  const image = useImage(DigitImages[digit]);

  if (!image) return null;

  CacheImages[digit] = image;

  return (
    <Image
      image={image}
      y={60}
      x={(index + 0.5) * 20}
      width={25}
      height={25}
      fit="contain"
    />
  );
});
