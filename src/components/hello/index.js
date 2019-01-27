import React, { Component } from 'react';

class Hello extends Component {
    sayHello(name) {
        return 'Hello' + name;
    }

    render() {
        return (
            <div>
                <p onClick={this.props.onPress}>
                    {this.sayHello(this.props.name)}
                </p>
            </div>
        );
    }
}

export default Hello;