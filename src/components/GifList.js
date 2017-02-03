import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    return <GifItem key={image.id}
                    gif={image}
                    onGifSelect={props.onGifSelect}
                    onFavoriteSelect={props.onFavoriteSelect}
                    onFavoriteDeselect={props.onFavoriteDeselect}
                    isAuthenticated={props.isAuthenticated}
                    isFavorite={props.isFavorite} />
  });

  return (
    <ul className="gif-list">{gifItems}</ul>
  );
};

export default GifList;
