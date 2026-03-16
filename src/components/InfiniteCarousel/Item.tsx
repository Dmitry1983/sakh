import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Animated, Image } from 'react-native';
import {
  TOTAL_ITEM_WIDTH,
  ITEM_SPACING,
  ITEM_WIDTH,
} from '@src/constants/layout';
import { get } from 'lodash';

interface ItemProps {
  item: any;
  index: number;
  scrollX: Animated.Value;
}

const ItemComponent: React.FC<ItemProps> = ({ item, index, scrollX }) => {
  const url = get(item, ['media', 'url'], null);
  const inputRange = [
    (index - 1) * TOTAL_ITEM_WIDTH,
    index * TOTAL_ITEM_WIDTH,
    (index + 1) * TOTAL_ITEM_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.item,
          {
            backgroundColor: item.color,
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Image
          source={{
            uri: url,
          }}
          style={styles.item}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    height: 180,
    marginHorizontal: ITEM_SPACING,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});

export const Item = React.memo(ItemComponent);
