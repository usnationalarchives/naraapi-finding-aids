import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../reducers/configureStore';
export const store = configureStore();

import FindingAids from '../containers/FindingAids';


const Index = ({url}) => (
  <Provider store={store}>
    <FindingAids router={url.query}/>
  </Provider>
);

export default Index;