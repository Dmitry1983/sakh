import React from 'react';
import type { PropsWithChildren } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

interface Styles {
  container: StyleProp<ViewStyle>;
}

const styles: Styles = {
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
};

type Props = PropsWithChildren<{
  style?: ViewStyle;
  children?: React.ReactNode;
}>;

export const CellComponent: React.FC<Props> = props => {
  const { children, style, ...otherProps } = props;
  return (
    <View style={[style, styles.container]} {...otherProps}>
      {children}
    </View>
  );
};
