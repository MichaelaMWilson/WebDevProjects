import React, { Component } from 'react'
import './App.css'
import NavBar from "./NavBar"
import {BrowserRouter, Route} from "react-router-dom"
import Home from "./Home"
import FarmerGame from "./FarmerGame/Main";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <NavBar/>
            <Route exact path='/' component={Home} />
            <Route path='/farmer' component={FarmerGame}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
