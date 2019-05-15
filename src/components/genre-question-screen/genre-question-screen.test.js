import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';
import question from '../../mocks/genre-question.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

it(`GenreQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<GenreQuestionScreen
    onAnswer={jest.fn()}
    question={question}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
