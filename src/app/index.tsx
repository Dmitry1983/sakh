import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Main } from '../screens/Main';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
