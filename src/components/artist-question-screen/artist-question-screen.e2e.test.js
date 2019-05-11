import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistQuestionScreen from './artist-question-screen.jsx';
import question from '../../mocks/artist-question.js';

configure({adapter: new Adapter()});

describe(`ArtistQuestionScreen renders correctly`, () => {
  it(`When user answers artist question form is not sent`, () => {

    const onAnswer = jest.fn();
    const artistQuestion = mount(<ArtistQuestionScreen
      onAnswer={onAnswer}
      question={question}
    />);

    const form = artistQuestion.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`change`, {
      preventDefault: formSendPrevention,
    });

    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`When user answers artist question input is changed`, () => {

    const onAnswer = jest.fn();
    const artistQuestion = mount(<ArtistQuestionScreen
      onAnswer={onAnswer}
      question={question}
    />);

    const input = artistQuestion.find(`input`);
    input.simulate(`change`);

    expect(onAnswer).toHaveBeenCalledTimes(1);
  });
});
