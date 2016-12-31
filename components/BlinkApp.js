import React, { Component } from 'react';
import {
    View
} from 'react-native';

import Blink from './Blink'
import styles from './styles'

class BlinkApp extends Component {
    render() {
        return (
            <View style={styles.flexbox}>
                <Blink style={styles.red} text='I love to blink'/>
                <Blink text='Yes blinking is so great'/>
                <Blink text='Why did they ever take this out of HTML'/>
                <Blink text='Look at me look at me look at me'/>
            </View>
        )
    }
}

export default BlinkApp