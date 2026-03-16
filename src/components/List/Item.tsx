import { get } from 'lodash';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface ItemProps {
  item: any;
  onPress: (id: string) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onPress }) => {
  console.log('ItemComponent :', { item });
  const url = get(item, ['image', 'url'], null);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <Image src={url} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1a1a3e',
    backgroundColor: 'lightgrey',
    marginHorizontal: 12,
    marginVertical: 3,
    borderRadius: 22,
    padding: 14,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#2a2a5e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    color: '#00d2ff',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  duration: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    color: '#888',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export const Item = React.memo(ItemComponent);
