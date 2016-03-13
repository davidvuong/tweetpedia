import React, { Component } from 'react';

if (process.env.BROWSER) { require('./Header.scss'); }

class Header extends Component {
  render() {
    return (
      <header>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </header>
    );
  }
}
export default Header;
