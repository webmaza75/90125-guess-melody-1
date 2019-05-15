import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      progress: null
    };

    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  _handleButtonClick() {
    this.props.onPlayButtonClick();
  }

  componentDidMount() {
    this._audio = new Audio(this.props.src);

    this.setState({
      progress: this._audio.currentTime
    });

    this._audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    this._audio.ontimeupdate = () => this.setState({
      progress: this._audio.currentTime
    });
  }

  componentDidUpdate() {
    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.currentTime = null;
    this._audio.ontimeupdate = null;
    this._audio.pause = null;
    this._audio.play = null;
    this._audio.src = ``;
    this._audio = null;
  }

  render() {
    const {isLoading} = this.state;
    const {isPlaying} = this.props;

    return (<div className="game__track">
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={this._handleButtonClick}
      >
      </button>
      <div className="track__status">
        <audio></audio>
      </div>
    </div>);
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
