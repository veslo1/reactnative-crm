import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class CRMPersonDetailCardView extends Component {
    render() {
         return (
             <View style={[this.props.style, {
                 alignItems: 'stretch',
                 width: 150,
                 height: 150,
                 borderColor: '#ddd',
                 borderWidth: StyleSheet.hairlineWidth
             }]}>
                <Image
                    style={{
                        width: 150,
                        height: 150,
                        marginBottom: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        backgroundColor: '#DDD',
                    }}
                    source={{
                        uri: this.props.person.image
                    }}
                    key={this.props.person.image}
                />
             </View>
         )
    }
}