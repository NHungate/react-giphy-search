import React, { Component } from 'react';

class GifItem extends Component {
  constructor(props) {
    super(props);
    this.state = { favorited: this.props.isFavorite };
  }

  favoriteGif() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.gif);
  }

  renderFavoriteHeart = () => {
    if (!this.props.isAuthenticated) {
      return '';
    }

    if (this.state.favorited) {
      return (<i className="favorite fa fa-heart" onClick={() => this.unfavoriteGif()}></i>);
    }

    return (<i className="favorite fa fa-heart-o" onClick={() => this.favoriteGif()}></i>);
  }

  render() {
    return (
      <div className="gif-item">
        {this.renderFavoriteHeart()}
        <img src={this.props.gif.images.downsized.url} alt="Gif" onClick={() => this.props.onGifSelect(this.props.gif)}/>
      </div>
    )
  }
}

export default GifItem;
