import React from 'react';
import { useSmartPolling } from '@src/hooks/useSmartPolling';
import { useGetFiltersQuery } from '@src/store/endpoints/filters';
import { selectAllFilters } from '@src/store/selectors/filtersSelectors';
import { List } from '@src/components/List/List';
import { useSelector } from 'react-redux';

export const ListContainer: React.FC = () => {
  const pollingInterval = useSmartPolling({});
  useGetFiltersQuery(undefined, { pollingInterval });

  return <List data={useSelector(selectAllFilters)} />;
};
