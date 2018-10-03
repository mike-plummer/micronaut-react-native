import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import App from './app/App';

interface Props {}

const Root: React.SFC<Props> = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
