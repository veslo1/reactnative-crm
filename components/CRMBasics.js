import React, { Component } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    ListView
} from 'react-native';

import CRMListView from './CRMListView';
import CRMDetailView from './CRMDetailView';
import getPersonsFromApiAsync from './getPersonsFromApiAsync';

export default class CRMBasics extends Component {
    // Initialize the hardcoded data 
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            selectedPerson: {
                id: 0
            }
        }
    }

    componentDidMount() {
        getPersonsFromApiAsync().then(persons => {
            console.log(persons);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                dataSource: ds.cloneWithRows(persons),
                selectedPerson: persons[0]
            })
        })
    }

    render() {
         return (
             <View style={{flex: 1, flexDirection: 'row'}}>
                <StatusBar hidden/>
                <CRMListView 
                    style={{
                        flex: 2,
                        borderRightColor: 'gray',
                        borderRightWidth: StyleSheet.hairlineWidth
                    }}
                    list={this.state.dataSource}
                    selectedPerson={this.state.selectedPerson}
                    onSelect={person => {
                        this.setState(Object.assign({}, this.state, {
                            selectedPerson: person
                        }))
                    }}
                ></CRMListView>
                <CRMDetailView style={{flex: 3}}></CRMDetailView>
             </View>
         )
    }
}