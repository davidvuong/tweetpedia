import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">TweetPedia</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}
export default Navigation;
