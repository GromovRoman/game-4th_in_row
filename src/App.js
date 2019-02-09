import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartScreen from './components/startscreen';
import Game from './components/game';
import Finish from './components/finish';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={StartScreen} />
                    <Route exact path="/game/" component={Game} />
                    <Route exact path="/finish/" component={Finish} />
                </Switch>
            </Router>
        );
    }
}

export default App;