import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player.jsx';
import question from '../../mocks/genre-question.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

configure({adapter: new Adapter()});

describe(`AudioPlayer renders correctly`, () => {
  it(`AudioPlayer renders correctly after relaunch`, () => {
    const audioPlayer = mount(<AudioPlayer
      src={question.answers[0].src}
      isPlaying={false}
      onPlayButtonClick={jest.fn()}
    />);

    expect(audioPlayer).toHaveLength(1);
    expect(audioPlayer.state(`isPlaying`)).toEqual(false);
  });

  it(`When user clicks button player will start`, () => {
    const audioPlayer = mount(<AudioPlayer
      src={question.answers[0].src}
      isPlaying={true}
      onPlayButtonClick={jest.fn()}
    />);

    const btn = audioPlayer.find(`button`).first();

    expect(audioPlayer.state(`isPlaying`)).toEqual(true);
    expect(btn.hasClass(`track__button--pause`));
  });
});
