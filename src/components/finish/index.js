import React from 'react';
import { Link } from 'react-router-dom';

export default class Finish extends React.Component {
    render() {
        return(
            <>
                <div>Game finished</div>
                <div>Game WIN {this.props.location.state.winner}</div> 
                <Link to='/'>Back to start</Link>   
            </>
        );
    }
}