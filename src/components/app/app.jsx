import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
    this._handleUpdateState = this._handleUpdateState.bind(this);
  }

  _getScreen(question, onClick) {
    if (!question) {
      const {
        mistakes,
        minutes
      } = this.props;

      return <WelcomeScreen
        mistakes={mistakes}
        minutes={minutes}
        onClick={onClick}
      />;
    }

    switch (question.type) {
      case QuestionType.GENRE: return <GenreQuestionScreen
        question={question}
        onAnswer={onClick}
      />;

      case QuestionType.ARTIST: return <ArtistQuestionScreen
        question={question}
        onAnswer={onClick}
      />;
    }

    return null;
  }

  _handleUpdateState() {
    const {questions} = this.props;

    this.setState((prevState) => ({
      question: prevState.question + 1 >= questions.length
        ? -1
        : prevState.question + 1,
    }));
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;
    const classNameType = question.type === QuestionType.ARTIST ? QuestionType.ARTIST : QuestionType.GENRE;

    return <section className={`game game--${classNameType}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{
              filter: `url(#blur)`,
              transform: `rotate(-90deg) scaleY(-1)`,
              transformOrigin: `center`
            }}
          />
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"/>
          <div className="wrong"/>
          <div className="wrong"/>
        </div>
      </header>

      {this._getScreen(questions[question], this._handleUpdateState)}
    </section>;
  }
}


App.propTypes = {
  minutes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([
    GenreQuestionScreen.propTypes.question,
    ArtistQuestionScreen.propTypes.question
  ])).isRequired
};

export default App;
