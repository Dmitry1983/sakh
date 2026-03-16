import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useBackgroundAnimations } from '@src/hooks/useScrollAnimations';
import { HEADER_HEIGHT } from '@src/constants/layout';

const BackgroundFillComponent: React.FC = () => {
  const { scale, opacity } = useBackgroundAnimations();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT + 50,
    backgroundColor: '#1e3a5f',
    zIndex: 0,
  },
});

export const BackgroundFill = React.memo(BackgroundFillComponent);
