import React, { createContext, useContext, useRef } from 'react';
import { Animated, FlatList } from 'react-native';

interface AnimatedScrollContextType {
  scrollY: Animated.Value;
  flatListRef: React.RefObject<FlatList<any> | null>;
}

const AnimatedScrollContext = createContext<AnimatedScrollContextType | null>(
  null,
);

export const useAnimatedScroll = (): AnimatedScrollContextType => {
  const context = useContext(AnimatedScrollContext);
  if (!context) {
    throw new Error(
      'useAnimatedScroll must be used within AnimatedScrollProvider',
    );
  }
  return context;
};

export const AnimatedScrollProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);

  return (
    <AnimatedScrollContext.Provider value={{ scrollY, flatListRef }}>
      {children}
    </AnimatedScrollContext.Provider>
  );
};
