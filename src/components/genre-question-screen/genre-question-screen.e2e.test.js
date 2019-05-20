import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';
import AudioPlayer from '../audio-player/audio-player.jsx';

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

const mock2 = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

describe(`Genre questions sqreen renders correctly`, () => {
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

  it(`When user clicks button player will pause`, () => {
    const {question} = mock;
    const onAnswerQuestion = jest.fn();
    const genreQuestion = mount(<GenreQuestionScreen
      onAnswer={onAnswerQuestion}
      question={question}
    />);

    genreQuestion.setState({activePlayer: 0});
    genreQuestion.update();
    const audioPlayer = genreQuestion.find(AudioPlayer).at(0);

    expect(audioPlayer.prop(`isPlaying`)).toEqual(true);
  });

  it(`When activePlayer = 0 first player plays`, () => {
    const {question} = mock2;
    const onAnswerQuestion = jest.fn();
    const genreQuestion = mount(<GenreQuestionScreen
      onAnswer={onAnswerQuestion}
      question={question}
    />);

    genreQuestion.setState({activePlayer: 0});
    genreQuestion.update();

    const audioPlayer0 = genreQuestion.find(AudioPlayer).at(0);
    const audioPlayer1 = genreQuestion.find(AudioPlayer).at(1);
    const audioPlayer2 = genreQuestion.find(AudioPlayer).at(2);

    expect(audioPlayer0.prop(`isPlaying`)).toEqual(true);
    expect(audioPlayer1.prop(`isPlaying`)).not.toEqual(true);
    expect(audioPlayer2.prop(`isPlaying`)).not.toEqual(true);
  });
});
