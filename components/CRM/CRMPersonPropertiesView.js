import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class CRMPersonPropertiesView extends Component {
    render() {
        return (
            <View>
                <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold'
                }} numberOfLines={1}>Name: {this.props.person.name}</Text>
                <View style={{
                    borderTopColor: '#E4E4E4',
                    borderTopWidth: StyleSheet.hairlineWidth,
                    marginTop: 5,
                    paddingTop: 5
                }}>
                    <Text style={{
                        fontSize: 14
                    }} numberOfLines={1}>ID: {this.props.person.id}</Text>
                    <Text style={{
                        fontSize: 14
                    }} numberOfLines={1}>Age: {this.props.person.age}</Text>
                    <Text style={{
                        fontSize: 14
                    }} numberOfLines={1}>Phone: {this.props.person.phone}</Text>
                </View>
                <View style={{
                    borderTopColor: '#E4E4E4',
                    borderTopWidth: StyleSheet.hairlineWidth,
                    marginTop: 5,
                    paddingTop: 5
                }}>
                    <Text style={{
                        fontSize: 14
                    }}>Phrase: {this.props.person.phrase}</Text>
                </View>
            </View>
        )
    }
}