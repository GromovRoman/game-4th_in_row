import React, { Component } from 'react';
import Table from '../table';
import Button from '../button';
import {Redirect} from 'react-router';
import axios from 'axios';

class Game extends Component { 
    
    constructor(props){
        super(props);
        
        this.state = {
            field: [],
            isPlayer_1: true,
            winner: false,
        }
    }

    componentDidMount() {
        this.updateField();
        this.timer = setInterval(this.updateField, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateField = () => {
        axios.get('http://localhost:5000/field').then((response) => {
            this.setState({
                field: response.data,
            });
        });
    }

    checkAxis_Y(x, y, curTrack) {
        let count = 1,
            step = 1;

        /*проверяем вверх от текущего*/
        while(this.state.field[y - step] !== undefined && this.state.field[x][y - step] === curTrack) {
            if(count !== 4) {
                count++;
                step++;
            }
        }
        step = 1;
        
        /*проверяем вниз от текущего*/
        while(this.state.field[y + step] !== undefined && this.state.field[x][y + step] === curTrack) {
            if(count !== 4) {
                count++;
                step++;
            }
        }
        
        if(count >= 4) {
            this.setState({
                winner: curTrack === 'X'? this.props.location.state.palyer_1: this.props.location.state.palyer_2,
            })
        }
    }

    checkAxis_XY(x, y, curTrack) {
        let count = 1,
            step = 1;
        /*проверяем вверх и влево от текущего*/
        while(this.state.field[x - step] !== undefined &&
            this.state.field[x][y - step] !== undefined &&
            this.state.field[x - step][y - step] === curTrack) {
            if(count !== 4) {
                count++;
                step++;
            }
        }
        step = 1;
        /*проверяем вниз и вправо от текущего*/
        while(this.state.field[x + step] !== undefined &&
            this.state.field[x][y + step] !== undefined &&
            this.state.field[x + step][y + step] === curTrack) {
            if(count !== 4) {
                count++;
                step++;
            }
        }
        
        if(count >= 4) {
            this.setState({
                winner: curTrack === 'X'? this.props.location.state.palyer_1: this.props.location.state.palyer_2,
            })
        }
    }
    
    checkAxis_YX(x, y, curTrack) {
        let count = 1,
            step = 1;
        /*проверяем вверх и вправо от текущего*/
        while(this.state.field[x + step] !== undefined &&
            this.state.field[x][y - step] !== undefined &&
            this.state.field[x + step][y - step] === curTrack) {
            if(count !== 4) {
                count++;
                step++;
            }
        }
        step = 1;
        /*проверяем вниз и влево от текущего*/
        while(this.state.field[x - step] !== undefined &&
            this.state.field[x][y + step] !== undefined &&
            this.state.field[x - step][y + step] === curTrack) {
            if(count !== 4) {
                count++;
                step++;
            }
        }
        
        if(count >= 4) {
            this.setState({
                winner: curTrack === 'X'? this.props.location.state.palyer_1: this.props.location.state.palyer_2,
            })
            
        }
    }

    clickColumnQ = (x, y) => {
        /*Проверяем занята ли ячейка*/
        if(this.state.field[x][y] !== null) {
            return;
        }
        
        /*полчучаем метку текущего игрока*/
        const trackCurrentPlayer = this.trackCurrentPlayer();
        
        /*копируем массив field из state*/
        let cloneField = this.cloneField(x);
        
        /*Если есть пустая ячейка ниже получаем её индекс, иначе текущий*/
        const newtPositionOnAxis_Y = this.getIndexToBellowEmptyCell(cloneField[x], y);
        
        /*Устанавливаем в ячейку метку текущего игрока*/
        cloneField[x][newtPositionOnAxis_Y] = trackCurrentPlayer;

        /*Проверяем, есть ли победитель*/
        
            /*Проверка оси Х*/
            this.checkAxis_X(x, newtPositionOnAxis_Y, trackCurrentPlayer);

            /*Проверка оси Y*/
            this.checkAxis_Y(x, newtPositionOnAxis_Y, trackCurrentPlayer);

            /*Проверка оси XY*/
            this.checkAxis_XY(x, newtPositionOnAxis_Y, trackCurrentPlayer);

            /*Проверка оси XY*/
            this.checkAxis_YX(x, newtPositionOnAxis_Y, trackCurrentPlayer);
        
        /*Устанавливаем новый state*/
        this.setState({
            field: cloneField,
            isPlayer_1: !this.state.isPlayer_1, 
        });
    }

    clickColumn = (x, y) => {
        axios.post('http://localhost:5000/move', {
            x: x, 
            y: y,
            player: this.props.location.state.palyer_1, 
        }).then((response) => {
            response.data.winner?
            this.setState({
                field: response.data.field,
                winner: response.data.winner,
            }):
            this.setState({
                field: response.data,
            });
        });
    }

    restart = () => {
        this.setState({
            field: [
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
            ],
            isPlayer_1: true,
        });
    }

    renderRedirect = () => {
        if (!this.props.location.state || !this.props.location.state.fromStartScreen) {
          return <Redirect to='/' />
        }
    }

  render() {
    if (!this.props.location.state || !this.props.location.state.fromStartScreen) {
        return <Redirect to='/' />
    }
    if (this.state.winner || this.state.winner === null) {
        return <Redirect to={{
            pathname: '/finish/',
            state: {
                winner: this.state.winner,
            }
        }}
        />
    }
    return (
        <div>
            <Table 
                field={this.state.field}
                onClickColumn={this.clickColumn}
                curPalyer={this.state.isPlayer_1}
                player_1={this.props.location.state.palyer_1}  
                player_2={this.props.location.state.palyer_2}  
            />
            <Button restart={this.restart}/>
        </div>
    );
  }
}

export default Game;