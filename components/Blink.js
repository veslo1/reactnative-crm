import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import styles from './styles'

class Blink extends Component {
    constructor (props) {
        super(props);
        this.state = {showText: true};

        //Toggle the state every second
        setInterval(() => {
            this.setState({showText: !this.state.showText})
        }, 1000)
    }

    render() {
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text style={[styles.bigblue, this.props.style]}>{display}</Text>
        );
    }
}

export default Blink