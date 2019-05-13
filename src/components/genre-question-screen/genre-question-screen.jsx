import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const genreType = [`rock`, `jazz`, `blues`];
const questionType = [`genre`, `artist`];

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: []
    };
  }

  /* Изменение состояния checked варианта ответа */
  _handleChange(event) {
    const idx = event.target.value;
    this._updateCheckedAnswers(idx);
  }

  /* Обновление состояния компонента, хранящего индексы выбранных ответов */
  _updateCheckedAnswers(idx) {
    const {answers} = this.state;
    const itemIdx = answers.indexOf(idx);
    let result;
    if (itemIdx === -1) {
      result = [...answers, idx];
    } else {
      result = answers.filter((val) => val !== idx);
    }
    this.setState({
      answers: result
    });
  }

  /* Подготовка вариантов ответов и отправка формы */
  _onSubmit(event) {
    event.preventDefault();
    const {question: {answers}, onAnswer} = this.props;
    const result = this.state.answers.map((val) => answers[val]);
    onAnswer(result);
  }

  render() {
    const {question} = this.props;
    const {
      answers,
      genre,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={(event) => this._onSubmit(event)}>
        {answers.map((it, i) => <div className="track" key={`answer-${i}`}>
          <button className="track__button track__button--play" type="button"/>
          <div className="track__status">
            <audio />
          </div>
          <div className="game__answer">
            <input className="game__input visually-hidden"
              type="checkbox" name="answer"
              value={i}
              id={`answer-${i}`}
              onChange={(event) => this._handleChange(event)}
            />
            <label className="game__check" htmlFor={`answer-${i}`}>
              Отметить
            </label>
          </div>
        </div>)}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf(genreType).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf(genreType).isRequired,
    type: PropTypes.oneOf(questionType).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
