import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class CRMPersonFamilyTreeView extends Component {
    render() {
         return (
             <View style={{flex: 1}}>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'steelblue'}}>
                    {
                        this.props.parent 
                        ? <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 3,
                                backgroundColor: '#DDD'
                            }}
                            source={{
                                uri: this.props.parent.image
                            }}
                            key={this.props.parent.image}
                        />
                        : null
                    }
                </View>
                <View style={{flex: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue'}}>
                    <Image
                        style={{
                            width: 160,
                            height: 160,
                            borderRadius: 10,
                            backgroundColor: '#DDD',
                        }}
                        source={{
                            uri: this.props.person.image
                        }}
                        key={this.props.person.image}
                    />
                </View>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'powderblue'}}>
                    {
                        this.props.children.map(
                            person => <Image
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 3,
                                                backgroundColor: '#DDD'
                                            }}
                                            source={{
                                                uri: person.image
                                            }}
                                            key={person.image}
                                        />
                        )
                    }
                </View>
             </View>
         )
    }
}