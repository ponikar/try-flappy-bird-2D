import { Box, Image, SkImage, useImage } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { useGameStateEffect } from "../hooks/useGameStateEffect";
import { useGameState } from "../store/game-state";

const useDigits = (digit: number) => {
  const images: SkImage[] = [];

  const zero = useImage(require("../assets/0.png"));
  const one = useImage(require("../assets/1.png"));
  const two = useImage(require("../assets/2.png"));
  const three = useImage(require("../assets/3.png"));
  const four = useImage(require("../assets/4.png"));
  const five = useImage(require("../assets/5.png"));
  const six = useImage(require("../assets/6.png"));
  const seven = useImage(require("../assets/7.png"));
  const eight = useImage(require("../assets/8.png"));
  const nine = useImage(require("../assets/9.png"));

  const digits = [zero, one, two, three, four, five, six, seven, eight, nine];

  const isPending = digits.every((digit) => !digit);

  if (isPending) return [];

  const digitArray = digit.toString().split("");

  digitArray.forEach((digit) => {
    images.push(digits[parseInt(digit)]);
  });

  return images;
};

export const Score = () => {
  const [currentScore, setCurrentScore] = React.useState(0);

  const digitsImage = useDigits(currentScore);

  const timeInterval = React.useRef<any>(0);

  useGameStateEffect(
    () => setCurrentScore((oldScore) => oldScore + 20),
    timeInterval.current
  );

  return (
    <>
      {digitsImage.map((digit, index) => {
        return (
          <Image
            key={index}
            image={digit}
            y={60}
            x={(index + 0.5) * 20}
            width={25}
            height={25}
            fit="contain"
          />
        );
      })}
    </>
  );
};
