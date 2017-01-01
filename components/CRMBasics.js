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
            selectedPerson: {
                id: 0
            }
        }
    }

    componentDidMount() {
        getPersonsFromApiAsync().then(persons => {
            this.setState({
                persons: persons,
                dataSource: this.state.dataSource.cloneWithRows(persons),
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
                    onSelect={targetPerson => {
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
                    }}
                ></CRMListView>
                <CRMDetailView style={{flex: 3}}></CRMDetailView>
             </View>
         )
    }
}