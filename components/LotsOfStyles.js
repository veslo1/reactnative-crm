import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from './styles'

class LotsOfStyles extends Component {
    render () {
        return (
            <View>
                <Text style={styles.red}>just red</Text>
                <Text style={styles.bigblue}>just bigblue</Text>
                <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
                <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
            </View>
        )
    }
}

export default LotsOfStyles