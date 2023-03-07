import React, { useEffect, useRef, useState } from "react";
import {
  Canvas,
  Path,
  Skia,
  Rect,
  rect,
  PathOp,
  FillType,
  ImageSVG,
  Image,
  SkiaView,
  useImage,
  SkPath,
} from "@shopify/react-native-skia";
import { Dimensions, Text, View } from "react-native";
import { Gesture, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const DEFAULT_PATH = Skia.Path.Make();
DEFAULT_PATH.addRect(rect(10, height / 5, width - 20, width - 20));

const scartchPath = Skia.Path.Make();
export const Scartch = () => {
  const [counter, setCounter] = useState(0);

  const image = useImage(require("../../coupen.png"));

  const imagePath = useRef<SkPath>(null);

  useEffect(() => {
    if (counter === 1) {
      imagePath.current = scartchPath;
    }
  }, [counter]);

  if (!image) return null;

  return (
    <PanGestureHandler
      onGestureEvent={({ nativeEvent: event }) => {
        // create a scartch path
        if (imagePath.current) {
          imagePath.current.addCircle(event.x, event.y, 20);
          imagePath.current.setFillType(FillType.InverseWinding);
        }
        // imagePath.current.op(scartchPath, PathOp.Difference);
        setCounter(counter + 1);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            position: "absolute",
            top: height / 2.2,
            left: 20,
          }}
        >
          You won 10% off on your next purchase
        </Text>
        <Canvas
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <Path
            clip={rect(0, 0, width, height)}
            color="red"
            path={DEFAULT_PATH}
          /> */}

          <Image
            image={image}
            width={width - 20}
            height={width - 20}
            fit="contain"
            y={height * 0.25}
            x={10}
            // give me example of clip
            clip={imagePath.current}
          />
        </Canvas>
      </View>
    </PanGestureHandler>
  );
};
