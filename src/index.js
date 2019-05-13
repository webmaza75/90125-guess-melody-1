import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import game from './mocks/game';

const init = () => {
  ReactDOM.render(
      <App
        {...game}
      />,
      document.querySelector(`.main`)
  );
};

init();
