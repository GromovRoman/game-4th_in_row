import React from 'react';
import Cell from '../cell';
import './column.css';

export default class Column extends React.Component {
    showCell = (el, i) => {
        return <Cell 
                    key={i}
                    data={el}
                    onClickColumn={() => this.props.onClickColumn(i)} 
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