import React from 'react';
import './cell.css';

export default class Cell extends React.Component {
    
    render() {
        
        return(
            <div className='cell'
                 onClick={this.props.onClickCell}   
            >
                {this.props.data}
            </div>    
        );
    }
}