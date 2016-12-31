import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import styles from './styles'

export default class MyScene extends Component {
    static get defaultProps() {
        return {
            title: 'MyScene'
        }
    }

    render() {
        return (
            <View style={styles.flexbox}>
                <Text>Current Scene: {this.props.title}</Text>
                
                <TouchableHighlight onPress={this.props.onForward}>
                    <Text>Tap me to load the next scene</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>Tap me to go back</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

MyScene.propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
}