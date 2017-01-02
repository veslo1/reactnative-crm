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
        this.state = {
            persons: [],
            selectedPerson: {}
        }
    }

    componentDidMount() {
        getPersonsFromApiAsync().then(persons => {
            this.setState(
                Object.assign({}, this.state, {
                    persons: persons,
                    selectedPerson: persons[0]
                })
            );
        })
    }

    selectPerson(targetPerson) {
        if (targetPerson.id === this.state.selectedPerson.id) return;

        this.setState(Object.assign({}, this.state, {
                selectedPerson: targetPerson
        }))
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
                    persons={this.state.persons}
                    selectedPerson={this.state.selectedPerson}
                    onSelect={person => this.selectPerson(person)}
                />
                <CRMDetailView
                    style={{flex: 3}}
                    persons={this.state.persons}
                    selectedPerson={this.state.selectedPerson}
                />
             </View>
         )
    }
}