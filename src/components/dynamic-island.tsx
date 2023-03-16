import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureEvent,
  PanGestureChangeEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";

export const DynamicIsland = () => {
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const halfWidth = useSharedValue(0);
  const halfHeight = useSharedValue(0);

  const cardPositionY = useSharedValue(-400);
  const onGestureEvent = (e: GestureEvent<PanGestureHandlerEventPayload>) => {
    const {
      nativeEvent: { x, y },
    } = e;

    width.value = interpolate(y, [0, 100], [120, 350], Extrapolate.CLAMP);
    height.value = interpolate(y, [0, 100], [37, 85], Extrapolate.CLAMP);

    halfWidth.value = interpolate(y, [0, 100], [0, 310], Extrapolate.CLAMP);
    halfHeight.value = interpolate(y, [0, 100], [0, 50], Extrapolate.CLAMP);

    cardPositionY.value = interpolate(
      y,
      [0, 200],
      [-100, 120],
      Extrapolate.CLAMP
    );
  };

  const dynamicIslandStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(width.value, {
        damping: 15,
      }),
      height: withSpring(height.value, {
        damping: 15,
      }),
    };
  });

  const halfDynamicIslandStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(halfWidth.value, {
        damping: 15,
      }),
      height: withSpring(halfHeight.value, {
        damping: 15,
      }),
    };
  });

  const cardStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withDelay(
            300,
            withTiming(cardPositionY.value, {
              duration: 1200,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          ),
        },
      ],
    };
  });

  return (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          left: 0,
          top: 0,
          height: 11,
          zIndex: 20,
          position: "absolute",
        }}
      />
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={(e) => {
          //   width.value = 120;
          //   height.value = 37;
          //   halfHeight.value = 0;
          //   halfWidth.value = 0;
          //   cardPositionY.value = -400;
        }}
      >
        <View style={styles.container}>
          <Animated.View style={[styles.dynamicIsland, dynamicIslandStyle]} />
          <Animated.View
            style={[
              {
                backgroundColor: "#CCD5AE",
                width: 260,
                height: 375,
                borderRadius: 40,
                alignSelf: "center",
                transform: [{ translateY: -200 }],
              },
              cardStyles,
            ]}
          />
          <Animated.View
            style={[styles.halfDynamicIsland, halfDynamicIslandStyle]}
          />
        </View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dynamicIsland: {
    position: "absolute",
    top: 11,
    width: 120,
    height: 37,
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "center",
    // overflow: "hidden",
  },
  halfDynamicIsland: {
    position: "absolute",
    top: 8,
    width: 310,
    height: 50,
    backgroundColor: "black",
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    alignSelf: "center",
    zIndex: 5,
  },
});
