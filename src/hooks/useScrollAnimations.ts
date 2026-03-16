import { useMemo } from 'react';
// import { Animated } from 'react-native';
import { useScrollContextNew } from '@src/context/ScrollContextNew';
import { HEADER_HEIGHT } from '@src/constants/layout';

export const useHeaderAnimations = () => {
  const { scrollY } = useScrollContextNew();

  const animations = useMemo(() => {
    const translateY = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT * 0.5],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT * 0.6],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const scale = scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: [1.5, 1],
      extrapolate: 'clamp',
    });

    return { translateY, opacity, scale };
  }, [scrollY]);

  return animations;
};

export const useMiniHeaderAnimations = () => {
  const { scrollY } = useScrollContextNew();

  const animations = useMemo(() => {
    const opacity = scrollY.interpolate({
      inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return { opacity };
  }, [scrollY]);

  return animations;
};

export const useBackgroundAnimations = () => {
  const { scrollY } = useScrollContextNew();

  const animations = useMemo(() => {
    const scale = scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: [1.5, 1],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT * 0.6],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return { scale, opacity };
  }, [scrollY]);

  return animations;
};
