import React, { Component } from 'react';
import Table from './components/table';

class App extends Component { 
    constructor(props){
        super(props);
        
        this.state = {
            field: [
                [0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 2],
                [0, 0, 0, 2, 1, 1],
                [0, 0, 0, 0, 1, 2],
                [0, 0, 0, 0, 1, 2],
                [0, 0, 1, 1, 1, 2],
                [0, 0, 0, 2, 2, 1],
            ],
        }
    }
    
    
    clickColumn = (i) => {
        const newField = [...this.state.field];
        
        newField[i] = [1, 1, 1, 1, 1, 1];
        this.setState({field: newField});
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
