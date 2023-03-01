import { useRef } from "react";
import { Dimensions } from "react-native";
import { playSound } from "../helpers/sound";
import { useBird } from "../store/bird";
import { useGameActions } from "../store/game-state";

interface Object {
  x: number;
  y: number;
  width: number;
  height: number;
}

const checkCollision = (obj1: Object, obj2: Object) => {
  // Get the bounding box coordinates for obj1
  let obj1_left = obj1.x;
  let obj1_top = obj1.y;
  let obj1_right = obj1.x + obj1.width;
  let obj1_bottom = obj1.y + obj1.height;

  // Get the bounding box coordinates for obj2
  let obj2_left = obj2.x;
  let obj2_top = obj2.y;
  let obj2_right = obj2.x + obj2.width;
  let obj2_bottom = obj2.y + obj2.height;

  // Check for overlap in the x-dimension
  let x_overlap = false;
  if (obj1_left < obj2_right && obj1_right > obj2_left) {
    x_overlap = true;
  }

  // Check for overlap in the y-dimension
  let y_overlap = false;
  if (obj1_top < obj2_bottom && obj1_bottom > obj2_top) {
    y_overlap = true;
  }

  // Return true if there is overlap in both dimensions
  if (x_overlap && y_overlap) {
    return true;
  } else {
    return false;
  }
};

const { height } = Dimensions.get("screen");

export const useGameOver = (pipe: Object) => {
  const bird = useBird();
  const { gameOver } = useGameActions();
  const isGameOver = checkCollision(bird, pipe);

  const isSoundPlayed = useRef(false);

  const isTouchingGround = bird.y >= height;

  if (isGameOver || isTouchingGround) {
    if (!isSoundPlayed.current) {
      playSound(require("../assets/audio/hit.wav"));
      setTimeout(() => playSound(require("../assets/audio/die.wav")), 1000);
      isSoundPlayed.current = true;
    }

    gameOver();
  }
};
