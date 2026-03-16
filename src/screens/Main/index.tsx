// import React from 'react';
// import { View, StyleProp, ViewStyle } from 'react-native';
// import { AnimatedScrollProvider } from '@src/context/ScrollContext';
// import { ContentListContainer } from '@src/components/ContentList/ContentListContainer';
// import { HeroBunnersContainer } from '@src/components/HeroBanners/HeroBunnersContainer';

// // import { InfiniteCarousel } from '@src/components/InfiniteCarousel';

// interface Styles {
//   container: StyleProp<ViewStyle>;
// }

// const styles: Styles = {
//   container: {
//     flex: 1,
//   },
// };

// export const Main: React.FC = () => {
//   return (
//     <AnimatedScrollProvider>
//       <View style={styles.container}>
//         <HeroBunnersContainer />
//         <ContentListContainer />

//         {/*<InfiniteCarousel />*/}
//       </View>
//     </AnimatedScrollProvider>
//   );
// };

// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from 'react-native';

// const HEADER_HEIGHT = 300;
// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const DATA = Array.from({ length: 50 }, (_, i) => ({
//   id: String(i),
//   title: `Item #${i + 1}`,
// }));

// export const Main = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;

//   // Header параллакс — уезжает медленнее
//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, HEADER_HEIGHT],
//     outputRange: [0, -HEADER_HEIGHT * 0.5],
//     extrapolate: 'clamp',
//   });

//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, HEADER_HEIGHT * 0.6],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const headerScale = scrollY.interpolate({
//     inputRange: [-200, 0],
//     outputRange: [1.5, 1],
//     extrapolate: 'clamp',
//   });

//   // Sticky mini-header появляется при скролле
//   const miniHeaderOpacity = scrollY.interpolate({
//     inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   const renderHeader = () => (
//     <Animated.View
//       style={[
//         styles.header,
//         {
//           transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//           opacity: headerOpacity,
//         },
//       ]}
//     >
//       <View style={styles.headerBackground}>
//         <Text style={styles.headerEmoji}>🎵</Text>
//       </View>

//       <Text style={styles.headerTitle}>Album Title</Text>
//       <Text style={styles.headerSubtitle}>Artist Name • 2024 • 12 tracks</Text>

//       {/* Все кнопки полностью кликабельны */}
//       <TouchableOpacity
//         style={styles.playButton}
//         onPress={() => console.log('✅ PLAY pressed!')}
//         activeOpacity={0.7}
//       >
//         <Text style={styles.playButtonText}>▶ Play</Text>
//       </TouchableOpacity>

//       <View style={styles.headerActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => console.log('✅ Like!')}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.actionText}>❤️ Like</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => console.log('✅ Shuffle!')}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.actionText}>🔀 Shuffle</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => console.log('✅ Share!')}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.actionText}>📤 Share</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.moreButton}
//         onPress={() => console.log('✅ More options!')}
//         activeOpacity={0.7}
//       >
//         <Text style={styles.moreText}>••• More options</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderListHeader = () => (
//     <View>
//       {/* Header — часть скролла, полный доступ к тачам */}
//       {renderHeader()}

//       {/* Разделитель — начало списка */}
//       <View style={styles.listTop}>
//         <View style={styles.dragIndicator} />
//         <Text style={styles.listTitle}>Tracks</Text>
//       </View>
//     </View>
//   );

//   const renderItem = ({ item }: { item: (typeof DATA)[0] }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => console.log(`Pressed ${item.title}`)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.itemRow}>
//         <View style={styles.itemIcon}>
//           <Text style={styles.itemIconText}>♪</Text>
//         </View>
//         <View style={styles.itemTextContainer}>
//           <Text style={styles.itemText}>{item.title}</Text>
//           <Text style={styles.itemSubtext}>3:42</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => console.log(`✅ Menu for ${item.title}`)}
//           style={styles.itemMenu}
//         >
//           <Text style={styles.itemMenuText}>⋮</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Фон header — абсолютный, для параллакса при overscroll */}
//       <Animated.View
//         style={[
//           styles.backgroundFill,
//           {
//             transform: [{ scale: headerScale }],
//             opacity: headerOpacity,
//           },
//         ]}
//         pointerEvents="none"
//       />

//       {/* Единый FlatList — header внутри, никаких конфликтов */}
//       <Animated.FlatList
//         data={DATA}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         ListHeaderComponent={renderListHeader}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true },
//         )}
//         scrollEventThrottle={16}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.flatListContent}
//         // Позволяет тянуть вниз (bounce) для эффекта scale
//         bounces={true}
//       />

//       {/* Sticky mini-header — появляется когда основной скрыт */}
//       <Animated.View
//         style={[styles.miniHeader, { opacity: miniHeaderOpacity }]}
//         pointerEvents="box-none"
//       >
//         <Text style={styles.miniHeaderTitle}>🎵 Album Title</Text>
//         <TouchableOpacity
//           onPress={() => console.log('✅ Mini play!')}
//           style={styles.miniPlayButton}
//         >
//           <Text style={styles.miniPlayText}>▶</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0f0f23',
//   },

//   // Фон для параллакс-эффекта
//   backgroundFill: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: HEADER_HEIGHT + 50,
//     backgroundColor: '#1e3a5f',
//     zIndex: 0,
//   },

//   // ===== HEADER =====
//   header: {
//     height: HEADER_HEIGHT,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 20,
//   },
//   headerBackground: {
//     marginBottom: 12,
//   },
//   headerEmoji: {
//     fontSize: 64,
//   },
//   headerTitle: {
//     fontSize: 28,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   headerSubtitle: {
//     fontSize: 13,
//     color: '#aac',
//     marginTop: 4,
//   },
//   playButton: {
//     marginTop: 16,
//     backgroundColor: '#00d2ff',
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 28,
//     elevation: 6,
//     shadowColor: '#00d2ff',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//   },
//   playButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     marginTop: 14,
//     gap: 12,
//   },
//   actionButton: {
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//   },
//   actionText: {
//     color: '#fff',
//     fontSize: 13,
//   },
//   moreButton: {
//     marginTop: 10,
//     paddingVertical: 6,
//   },
//   moreText: {
//     color: '#888',
//     fontSize: 13,
//   },

//   // ===== LIST TOP =====
//   listTop: {
//     backgroundColor: '#16213e',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingTop: 12,
//     paddingHorizontal: 20,
//     paddingBottom: 8,
//   },
//   dragIndicator: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#444',
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginBottom: 12,
//   },
//   listTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 4,
//   },

//   // ===== FLATLIST =====
//   flatListContent: {
//     paddingBottom: 100,
//     backgroundColor: '#16213e',
//   },

//   // ===== LIST ITEMS =====
//   item: {
//     backgroundColor: '#1a1a3e',
//     marginHorizontal: 12,
//     marginVertical: 3,
//     borderRadius: 12,
//     padding: 14,
//   },
//   itemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 8,
//     backgroundColor: '#2a2a5e',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   itemIconText: {
//     fontSize: 18,
//     color: '#00d2ff',
//   },
//   itemTextContainer: {
//     flex: 1,
//   },
//   itemText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   itemSubtext: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 2,
//   },
//   itemMenu: {
//     padding: 8,
//   },
//   itemMenuText: {
//     color: '#888',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },

//   // ===== MINI HEADER =====
//   miniHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 90,
//     backgroundColor: 'rgba(15, 15, 35, 0.95)',
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.1)',
//   },
//   miniHeaderTitle: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//   },
//   miniPlayButton: {
//     backgroundColor: '#00d2ff',
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   miniPlayText: {
//     color: '#000',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { ScrollProviderNew } from '@src/context/ScrollContextNew';
import { BackgroundFill } from '@src/components/BackgroundFill';
import { List } from '@src/components/List';
import { MiniHeader } from '@src/components/MiniHeader';

export const Main: React.FC = () => {
  return (
    <ScrollProviderNew>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Слой 1: Параллакс фон */}
        <BackgroundFill />

        {/* Слой 2: Основной список с header внутри */}
        <List />

        {/* Слой 3: Mini header поверх всего */}
        <MiniHeader />
      </View>
    </ScrollProviderNew>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
});
