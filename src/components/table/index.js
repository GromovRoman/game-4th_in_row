import React from 'react';
import Column from '../column';
import './table.css';

export default class Table extends React.Component {
    renderColumn = (el, i) => {
        return <Column 
                    data={el}
                    key={i}
                    onClickColumn={this.props.onClickColumn}
                />
    }
    render() {
        return(
            <div className='table'>
                {this.props.field.map(this.renderColumn)}
            </div>
        );
    }
} 