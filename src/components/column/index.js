import React from 'react';
import Cell from '../cell';
import './column.css';

export default class Column extends React.Component {
    showCell = (el, y) => {
        return <Cell 
                    key={y}
                    data={el}
                    onClickCell={() => this.props.onClickColumn(this.props.x, y)} 
                />
    }
    render() {
        return(
            <div className='column'>
                {this.props.data.map(this.showCell)}
            </div>   
        );
    }
}