import React from 'react';
import { Link } from 'react-router-dom';
import './startGame.css';

class StartScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            player_1: null,
            player_2: null,
        };
    }

    setNamePlayer = (event) => {
        event.target.id === 'player_1'?
        this.setState({
            player_1: event.target.value,
        }):
        this.setState({
            player_2: event.target.value
        });
    }

    render() {
        return(
            <div className='startGame'>
                <input id='player_1' type='text' onChange={this.setNamePlayer} value={this.state.setName_player_1}/>    
                <input id='player_2' type='text' onChange={this.setNamePlayer} value={this.state.setName_player_2}/>     
                <Link 
                    to={{
                        pathname: "/game",
                        state: {
                            fromStartScreen: true,
                            palyer_1: this.state.player_1,
                            palyer_2: this.state.player_2,
                        }
                    }} 
                    className='startGame__link'
                >
                    Start Game
                </Link>
            </div>
        );
    }
}

export default StartScreen;