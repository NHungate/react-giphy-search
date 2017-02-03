import React, { Component } from 'react';

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

class SearchBar extends Component {
  constructor() {
    super();

    this.delayOnInputChange = debounce(function(term) {
      this.props.onTermChange(term);
    }, 300);
  }

  onInputChange(event) {
    const term = event.target.value;

    return this.delayOnInputChange(term);
  }

  render() {
    return (
      <div className="search">
        <input className="form-control" type="search" placeholder="Enter text to search for gifs!" onChange={this.onInputChange.bind(this)} />
      </div>
    );
  }
}

export default SearchBar;
