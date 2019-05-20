import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isFunction} from 'util';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this._audioRef = React.createRef();

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying === true ? true : false,
      progress: 0
    };

    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  _handleButtonClick() {
    const {onPlayButtonClick} = this.props;

    if (onPlayButtonClick && isFunction(onPlayButtonClick)) {
      this.props.onPlayButtonClick();
    }
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying
    }));
  }

  componentDidMount() {
    const audio = this._audioRef.current;

    if (!audio) {
      return;
    }

    audio.src = this.props.src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => {
      const {currentTime, duration} = audio;
      const currentProgress = Math.floor(currentTime * 100 / duration);

      this.setState({
        progress: currentProgress
      });
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isPlaying !== undefined && nextProps.isPlaying !== prevState.isPlaying) {
      return {
        isPlaying: nextProps.isPlaying
      };
    }
    return null;
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;
    const {isPlaying} = this.state;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.currentTime = null;
    audio.ontimeupdate = null;
    audio.pause = null;
    audio.play = null;
    audio.src = ``;
  }

  render() {
    const {isLoading, isPlaying, progress} = this.state;

    return (<div className="game__track">
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={this._handleButtonClick}
      >
      </button>
      <div className="track__status">
        <audio ref={this._audioRef}></audio>
        <div
          className="track__progress"
          style={{
            height: `2px`,
            background: `#707070`,
            marginTop: `55px`,
            width: `${progress}%`,
          }}/>
      </div>
    </div>);
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func,
};

export default AudioPlayer;
