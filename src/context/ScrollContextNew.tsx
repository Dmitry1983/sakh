import React, { createContext, useContext, useRef, useMemo } from 'react';
import { Animated } from 'react-native';

interface ScrollContextType {
  scrollY: Animated.Value;
  onScroll: (...args: any[]) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollContextNew = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return context;
};

interface ScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollProviderNew: React.FC<ScrollProviderProps> = ({
  children,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      }),
    [scrollY],
  );

  const value = useMemo(() => ({ scrollY, onScroll }), [scrollY, onScroll]);

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};
