import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Background from '../src/Images/21562944.jpg'
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <div className="divStyle" style={{ minHeight: '100%', backgroundImage: "url(" + Background + ")", flexDirection: "column",opacity:0.9 }}>
              <Navbar />
              <Main/>
            </div>
          </Router>
      </Provider>
    );
  }
}

export default App;