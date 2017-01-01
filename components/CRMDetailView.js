import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class CRMDetailView extends Component {
    render() {
         return (
             <View style={[this.props.style]}>
                <Text style={{backgroundColor: 'gray', color: 'white', textAlign: 'center'}}>CRMDetailView</Text>
             </View>
         )
    }
}