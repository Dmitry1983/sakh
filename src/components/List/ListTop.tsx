import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ListTopProps {
  title: string;
}

const ListTopComponent: React.FC<ListTopProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dragIndicator} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 4,
  },
});

export const ListTop = React.memo(ListTopComponent);
