import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app.jsx';
import mockTestQuestions from '../../mocks/mock-test-questions.js';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

configure({adapter: new Adapter()});

describe(`App renders correctly`, () => {
  it(`App renders WelcomeScreen before start game`, () => {
    const {questions} = mockTestQuestions;
    const app = mount(<App
      mistakes={0}
      minutes={0}
      questions={questions}
    />);

    expect(app.state(`question`)).toEqual(-1);
    expect(app.find(WelcomeScreen)).toHaveLength(1);
  });


  it(`On click on WelcomeScreen App switches to the first question`, () => {
    const {questions} = mockTestQuestions;
    const app = mount(<App
      mistakes={0}
      minutes={0}
      questions={questions}
    />);

    const button = app.find(`button`);
    button.simulate(`click`);
    app.update();

    expect(app.state(`question`)).toEqual(0);
  });


  it(`Question answer switches to another question`, () => {
    const {questions} = mockTestQuestions;
    const app = mount(<App
      mistakes={0}
      minutes={0}
      questions={questions}
    />);

    app.setState({
      question: 0,
    });
    app.update();

    const form = app.find(`form`);
    form.simulate(`submit`);

    expect(app.state(`question`)).toEqual(1);
  });


  it(`Last question answer leads to the first screen`, () => {
    const {questions} = mockTestQuestions;
    const app = mount(<App
      mistakes={0}
      minutes={0}
      questions={questions}
    />);

    app.setState({
      question: questions.length - 1,
    });
    app.update();

    const input = app.find(`.artist__input`).first();
    input.simulate(`change`);

    expect(app.state(`question`)).toEqual(-1);
    expect(app.find(WelcomeScreen)).toHaveLength(1);
  });
});
