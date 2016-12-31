import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Greeting from './Greeting';

class LotsOfGreeting extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <Greeting name='Rexxar'/>
                <Greeting name='Jaina'/>
                <Greeting name='Valeera'/>
            </View>
        )
    }
}

export default LotsOfGreeting