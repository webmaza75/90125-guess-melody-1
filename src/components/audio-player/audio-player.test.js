import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player.jsx';
import question from '../../mocks/genre-question.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

it(`AudioPlayer is rendered correctly`, () => {
  const onPlayButtonClick = jest.fn();
  const {answers} = question;
  const tree = renderer.create(<AudioPlayer
    src={answers[0].src}
    isPlaying={true}
    onPlayButtonClick={onPlayButtonClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();

});
