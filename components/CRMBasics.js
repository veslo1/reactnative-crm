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
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            selectedPerson: {},
            persons: []
        }
    }

    componentDidMount() {
        getPersonsFromApiAsync().then(persons => {
            this.setState(
                Object.assign({}, this.state, {
                    persons: persons
                })
            );
            this.selectPerson(persons[0]);
        })
    }

    selectPerson(targetPerson) {
        if (targetPerson.id === this.state.selectedPerson.id) return;

        //update selectedPerson in listView
        let newPersons = this.state.persons.map(
            person => (
                person.id === targetPerson.id || person.id === this.state.selectedPerson.id
                ? {...person}
                : person
            )
        );

        this.setState(Object.assign({
                dataSource: this.state.dataSource.cloneWithRows(newPersons),
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
                    list={this.state.dataSource}
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