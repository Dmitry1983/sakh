import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';
import { heroBunnersApi } from '@src/store/endpoints/heroBunners';

// Селектор с глубоким сравнением
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectHeroBunnersResult =
  heroBunnersApi.endpoints.getHeroBunners.select();

export const selectAllHeroBunners = createDeepEqualSelector(
  selectHeroBunnersResult,
  result => result ?? [],
);
