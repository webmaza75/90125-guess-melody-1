import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

it(`WelcomeScreen correctly renders`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      minutes={0}
      mistakes={0}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
