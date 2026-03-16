import React, { useRef, useCallback, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { Pagination } from '@src/components/Pagination';
import { Item } from './Item';

import {
  ITEM_SPACING,
  ITEM_WIDTH,
  TOTAL_ITEM_WIDTH,
  AUTO_SCROLL_INTERVAL,
  SCREEN_WIDTH,
} from '@src/constants/layout';

type InfiniteCarouselType = {
  data: any;
};

const InfiniteCarouselComponent: React.FC<InfiniteCarouselType> = ({
  data,
}) => {
  const data_ = data ?? [];
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const autoScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIndex = useRef(data_.length); // начинаем со средней копии
  const isUserScrolling = useRef(false);

  const loopedData = [...data_, ...data_, ...data_].map((item, idx) => ({
    ...item,
    key: `${item.id}_${idx}`,
  }));

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollTimer.current = setInterval(() => {
      if (!isUserScrolling.current) {
        currentIndex.current += 1;
        flatListRef.current?.scrollToOffset({
          offset: currentIndex.current * TOTAL_ITEM_WIDTH,
          animated: true,
        });
      }
    }, AUTO_SCROLL_INTERVAL);
  }, [stopAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [startAutoScroll, stopAutoScroll]);

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / TOTAL_ITEM_WIDTH);
      currentIndex.current = index;

      const len = data_.length;

      if (index >= len * 2) {
        const newIndex = index - len;
        currentIndex.current = newIndex;
        flatListRef.current?.scrollToOffset({
          offset: newIndex * TOTAL_ITEM_WIDTH,
          animated: false,
        });
      } else if (index < len) {
        const newIndex = index + len;
        currentIndex.current = newIndex;
        flatListRef.current?.scrollToOffset({
          offset: newIndex * TOTAL_ITEM_WIDTH,
          animated: false,
        });
      }

      isUserScrolling.current = false;
      startAutoScroll();
    },
    [startAutoScroll, data_.length],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return <Item item={item} index={index} scrollX={scrollX} />;
    },
    [scrollX],
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={loopedData}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={TOTAL_ITEM_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: TOTAL_ITEM_WIDTH,
          offset: TOTAL_ITEM_WIDTH * index,
          index,
        })}
        initialScrollIndex={data_.length}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        onScrollBeginDrag={() => {
          isUserScrolling.current = true;
          stopAutoScroll();
        }}
        onMomentumScrollEnd={handleMomentumEnd}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2 - ITEM_SPACING,
        }}
        removeClippedSubviews
        windowSize={5}
      />
      <Pagination data={data_} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export const InfiniteCarousel = React.memo(InfiniteCarouselComponent);
