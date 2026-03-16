import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';
import { filtersApi } from '@src/store/endpoints/filters';

// Селектор с глубоким сравнением
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectFiltersResult = filtersApi.endpoints.getFilters.select();

export const selectAllFilters = createDeepEqualSelector(
  selectFiltersResult,
  result => result.data ?? [],
);
