import React from 'react';
import Column from '../column';
import './table.css';

export default class Table extends React.Component {
    renderColumn = (el, x) => {
        return <Column 
                    data={el}
                    key={x}
                    onClickColumn={this.props.onClickColumn}
                    x={x}
                />
    }
    render() {
        return(
            <>
                <div>Сейчас ходит: {this.props.curPalyer? this.props.player_1: this.props.player_2}</div>
                <div className='table'>
                    {this.props.field.map(this.renderColumn)}
                </div>
            </>
        );
    }
} 