import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import questions from './mocks/questions';

const init = (gameQuestions) => {
  ReactDOM.render(
      <App
        minutes={5}
        mistakes={3}
        questions={gameQuestions}
      />,
      document.querySelector(`.main`)
  );
};

init(questions);
