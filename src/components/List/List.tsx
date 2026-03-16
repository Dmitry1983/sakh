import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { useScrollContextNew } from '@src/context/ScrollContextNew';
import { Header } from '../Header';
import { ListTop } from './ListTop';
import { Item } from './Item';
import { CellComponent } from './CellComponent';

type ListType = {
  data: any;
};

const ListComponent: React.FC<ListType> = ({ data }) => {
  const { onScroll } = useScrollContextNew();

  const renderListHeader = useCallback(
    () => (
      <View>
        <Header />
        <ListTop title="Список мест" />
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Item
        item={item}
        onPress={() => {
          console.log('on Press item List');
        }}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  const CellRenderer = React.useCallback(
    (props: any) => <CellComponent {...props} />,
    [],
  );

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={renderListHeader}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      bounces={true}
      removeClippedSubviews={true}
      maxToRenderPerBatch={15}
      windowSize={10}
      CellRendererComponent={CellRenderer}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
    backgroundColor: '#16213e',
  },
});

export const List = React.memo(ListComponent);
