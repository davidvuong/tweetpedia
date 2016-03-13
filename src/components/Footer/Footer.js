import React, { Component } from 'react';

if (process.env.BROWSER) { require('./Footer.scss'); }

class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          <a href="https://github.com/davidvuong/tweetpedia" target="_blank">
            GitHub/DavidVuong/TweetPedia
          </a>
        </p>
        <div className="bars">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </footer>
    );
  }
}
export default Footer;
