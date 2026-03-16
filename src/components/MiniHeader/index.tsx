import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useMiniHeaderAnimations } from '@src/hooks/useScrollAnimations';
import { MINI_HEADER_HEIGHT } from '@src/constants/layout';

const MiniHeaderComponent: React.FC = () => {
  const { opacity } = useMiniHeaderAnimations();

  return (
    <Animated.View
      style={[styles.container, { opacity }]}
      pointerEvents="box-none"
    >
      <Text style={styles.title}>Список мест</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: MINI_HEADER_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
});

export const MiniHeader = React.memo(MiniHeaderComponent);
