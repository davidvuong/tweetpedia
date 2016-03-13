import React from 'react';
import Navigation from '../../components/Navigation/Navigation';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <div className="container">
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
export default App;
