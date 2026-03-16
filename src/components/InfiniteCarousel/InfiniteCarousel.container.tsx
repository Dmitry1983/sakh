import React from 'react';
import { InfiniteCarousel } from './InfiniteCarousel';

import { useSmartPolling } from '@src/hooks/useSmartPolling';
import { useGetHeroBunnersQuery } from '@src/store/endpoints/heroBunners';
import { selectAllHeroBunners } from '@src/store/selectors/heroBunnersSelectors';

import { useSelector } from 'react-redux';

export const InfiniteCarouselContainer = () => {
  const pollingInterval = useSmartPolling({});
  useGetHeroBunnersQuery(undefined, { pollingInterval });

  const { data: allHeroBunners } = useSelector(selectAllHeroBunners);

  return <InfiniteCarousel data={allHeroBunners} />;
};
