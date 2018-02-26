import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../reducers/configureStore';
export const store = configureStore();

import FindingAids from '../containers/FindingAids';


const Index = () => (
  <Provider store={store}>
    <FindingAids />
  </Provider>
);

export default Index;