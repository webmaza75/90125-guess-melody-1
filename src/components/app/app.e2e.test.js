import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`App correctly renders after relaunch`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<App
    mistakes={0}
    minutes={0}
    onClick={clickHandler}
  />);

  const startButton = app.find(`button`);
  startButton.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
