import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

export const HEADER_HEIGHT = 300;
export const MINI_HEADER_HEIGHT = 90;

// Carousel
export const ITEM_WIDTH = SCREEN_WIDTH * 0.75;
export const ITEM_SPACING = 10;
export const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;
export const AUTO_SCROLL_INTERVAL = 5000;

//
