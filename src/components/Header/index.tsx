import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useHeaderAnimations } from '@src/hooks/useScrollAnimations';
import { HEADER_HEIGHT } from '@src/constants/layout';
import { InfiniteCarousel } from '@src/components/InfiniteCarousel';

const HeaderComponent: React.FC = () => {
  const { translateY, opacity, scale } = useHeaderAnimations();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    >
      <InfiniteCarousel />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    color: '#aac',
    marginTop: 4,
  },
  moreButton: {
    marginTop: 10,
    paddingVertical: 6,
  },
  moreText: {
    color: '#888',
    fontSize: 13,
  },
});

export const Header = React.memo(HeaderComponent);
