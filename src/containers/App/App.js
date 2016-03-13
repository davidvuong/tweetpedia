import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
export default App;
