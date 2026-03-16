import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import { TOTAL_ITEM_WIDTH } from '@src/constants/layout';

interface PaginationProps {
  data: any[];
  scrollX: Animated.Value;
}

export const Pagination: React.FC<PaginationProps> = ({ data, scrollX }) => (
  <View style={styles.pagination}>
    {data.map((_, i) => {
      const inputRange = data.map(
        (__, j) => (j + data.length) * TOTAL_ITEM_WIDTH,
      );

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: data.map((__, j) => (j === i ? 1 : 0.4)),
        extrapolate: 'clamp',
      });

      return <Animated.View key={i} style={[styles.dot, { opacity }]} />;
    })}
  </View>
);

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 6,
  },
});
