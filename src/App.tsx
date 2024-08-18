import React from 'react';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LandingPage />
    </Provider>
  );
};

export default App;
