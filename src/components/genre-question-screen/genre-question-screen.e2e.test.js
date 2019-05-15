import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswerQuestion = jest.fn();
  const genreQuestion = mount(<GenreQuestionScreen
    onAnswer={onAnswerQuestion}
    question={question}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswerQuestion).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
