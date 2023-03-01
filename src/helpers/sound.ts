import { Audio } from "expo-av";

export const playSound = async (url: any) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(url);
    soundObject.playAsync();
  } catch (error) {
    console.log("Error playing sound", error);
  }
};
