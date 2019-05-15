import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player.jsx';
import question from '../../mocks/genre-question.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

configure({adapter: new Adapter()});

describe(`AudioPlayer renders correctly`, () => {
  it(`AudioPlayer renders correctly after relaunch`, () => {
    const i = 0;
    let activePlayer = -1;
    const audioPlayer = shallow(<AudioPlayer
      src={question.answers[0].src}
      isPlaying={i === activePlayer}
      onPlayButtonClick={jest.fn()}
    />);

    expect(audioPlayer).toHaveLength(1);
    expect(audioPlayer.instance().props.isPlaying).toEqual(false);
  });

  it(`When user clicks button player will start`, () => {
    const i = 0;
    let activePlayer = -1;
    const audioPlayer = shallow(<AudioPlayer
      src={question.answers[0].src}
      isPlaying={i === activePlayer}
      onPlayButtonClick={jest.fn()}
    />);

    const btn = audioPlayer.find(`button`).first();
    btn.simulate(`click`);

    activePlayer = i === activePlayer ? -1 : i;
    audioPlayer.setProps({isPlaying: i === activePlayer});
    audioPlayer.update();

    expect(audioPlayer).toHaveLength(1);
    expect(audioPlayer.instance().props.isPlaying).toEqual(true);
    expect(btn.hasClass(`track__button--pause`));
  });

  it(`When user twice clicks button player will pause`, () => {
    const i = 0;
    let activePlayer = -1;
    const audioPlayer = shallow(<AudioPlayer
      src={question.answers[0].src}
      isPlaying={i === activePlayer}
      onPlayButtonClick={jest.fn()}
    />);

    const btn = audioPlayer.find(`button`).first();

    btn.simulate(`click`);
    activePlayer = i === activePlayer ? -1 : i;
    audioPlayer.setProps({isPlaying: i === activePlayer});
    audioPlayer.update();

    btn.simulate(`click`);
    activePlayer = i === activePlayer ? -1 : i;
    audioPlayer.setProps({isPlaying: i === activePlayer});
    audioPlayer.update();

    expect(audioPlayer).toHaveLength(1);
    expect(audioPlayer.instance().props.isPlaying).toEqual(false);
    expect(btn.hasClass(`track__button--play`));
  });
});
