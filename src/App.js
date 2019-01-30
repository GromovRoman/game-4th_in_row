import React, { Component } from 'react';
import Table from './components/table';

class App extends Component { 
    constructor(props){
        super(props);
        
        this.state = {
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
        }
    }
    
    cloneField(x) {
        {/*копируем массив field из state и заменяем уолонку с которой будем работать*/}
        let newField = [...this.state.field]; 
        
        newField[x] = [...this.state.field[x]]
        
        return newField;
    }
    
    trackCurrentPlayer() {
        {/*узнаем какой игрок ходит и устанавливаем его фишку*/}
        const newCell = this.state.isPlayer_1? 'X': 'O';
        return newCell;
    }
    
    getIndexToBellowEmptyCell(arrColumn, y) {
        {/*Проверяем есть ли пустые поля ниже выбранной ячейки, если ДА, возвращаем её индекс*/}
        for(let i = arrColumn.length -1; i >= y; i--) {
            if(arrColumn[i] === null) {
                return i;
            }
        }
    }

    checkAxis_X(x, y, curTrack) {
        let count = 1,
            step = 1;

        {/*проверяем влево от текущего*/}
        while(this.state.field[x - step] !== undefined && this.state.field[x - step][y] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        step = 1;
        
        {/*проверяем вправо от текущего*/}
        while(this.state.field[x + step] !== undefined && this.state.field[x + step][y] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        
        if(count === 5) {
            alert(`${curTrack}!\nWinner winner chicken dinner!`);
        }
    }

    checkAxis_Y(x, y, curTrack) {
        let count = 1,
            step = 1;

        {/*проверяем вверх от текущего*/}
        while(this.state.field[y - step] !== undefined && this.state.field[x][y - step] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        step = 1;
        
        {/*проверяем вниз от текущего*/}
        while(this.state.field[y + step] !== undefined && this.state.field[x][y + step] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        
        if(count === 5) {
            alert(`${curTrack}!\nWinner winner chicken dinner!`);
        }
    }

    checkAxis_XY(x, y, curTrack) {
        let count = 1,
            step = 1;
        {/*проверяем вверх и влево от текущего*/}
        while(this.state.field[x - step] !== undefined &&
            this.state.field[x][y - step] !== undefined &&
            this.state.field[x - step][y - step] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        step = 1;
        {/*проверяем вниз и вправо от текущего*/}
        while(this.state.field[x + step] !== undefined &&
            this.state.field[x][y + step] !== undefined &&
            this.state.field[x + step][y + step] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        
        if(count === 5) {
            alert(`${curTrack}!\nWinner winner chicken dinner!`);
        }
    }
    
    checkAxis_YX(x, y, curTrack) {
        let count = 1,
            step = 1;
        {/*проверяем вверх и вправо от текущего*/}
        while(this.state.field[x + step] !== undefined &&
            this.state.field[x][y - step] !== undefined &&
            this.state.field[x + step][y - step] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        step = 1;
        {/*проверяем вниз и влево от текущего*/}
        while(this.state.field[x - step] !== undefined &&
            this.state.field[x][y + step] !== undefined &&
            this.state.field[x - step][y + step] === curTrack) {
            if(count !== 5) {
                count++;
                step++;
            }
        }
        
        if(count === 5) {
            alert(`${curTrack}!\nWinner winner chicken dinner!`);
        }
    }

    clickColumn = (x, y) => {
        {/*Проверяем занята ли ячейка*/}
        if(this.state.field[x][y] !== null) {
            return;
        }
        
        {/*полчучаем метку текущего игрока*/}
        const trackCurrentPlayer = this.trackCurrentPlayer();
        
        {/*копируем массив field из state*/}
        let cloneField = this.cloneField(x);
        
        {/*Если есть пустая ячейка ниже получаем её индекс, иначе текущий*/}
        const newtPositionOnAxis_Y = this.getIndexToBellowEmptyCell(cloneField[x], y);
        
        {/*Устанавливаем в ячейку метку текущего игрока*/}
        cloneField[x][newtPositionOnAxis_Y] = trackCurrentPlayer;

        {/*Проверяем, есть ли победитель*/}
        
            {/*Проверка оси Х*/}
            this.checkAxis_X(x, newtPositionOnAxis_Y, trackCurrentPlayer);

            {/*Проверка оси Y*/}
            this.checkAxis_Y(x, newtPositionOnAxis_Y, trackCurrentPlayer);

            {/*Проверка оси XY*/}
            this.checkAxis_XY(x, newtPositionOnAxis_Y, trackCurrentPlayer);

            {/*Проверка оси XY*/}
            this.checkAxis_YX(x, newtPositionOnAxis_Y, trackCurrentPlayer);
        
        {/*Устанавливаем новый state*/}
        this.setState({
            field: cloneField,
            isPlayer_1: !this.state.isPlayer_1, 
        });
    }
    
  render() {
    return (
        <Table 
            field={this.state.field}
            onClickColumn = {this.clickColumn}    
        />
    );
  }
}

export default App;