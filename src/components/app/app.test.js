import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
import mockTestQuestions from '../../mocks/mock-test-questions.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

it(`App correctly renders after relaunch`, () => {
  const {questions} = mockTestQuestions;
  const tree = renderer
    .create(<App
      minutes={0}
      mistakes={0}
      questions={questions}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
