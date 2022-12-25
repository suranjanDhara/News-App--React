import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import NewsItem from './Components/NewsItem';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <News/>
        my name is Suranjan Dhara
        <NewsItem/>
      </div>
    )
  }
}
