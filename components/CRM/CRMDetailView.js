import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import CRMPersonFamilyTreeView from './CRMPersonFamilyTreeView';
import CRMPersonPropertiesView from './CRMPersonPropertiesView';

export default class CRMDetailView extends Component {
    render() {
        let parent = this.props.persons.filter(
                person => person.id===this.props.selectedPerson.parentId
            )[0];

        let children = this.props.persons.filter(
                person => person.parentId===this.props.selectedPerson.id
            );

        let familyTreeView = this.props.selectedPerson.id 
                            ? <CRMPersonFamilyTreeView 
                                parent={parent} 
                                person={this.props.selectedPerson}
                                children={children}
                                onSelect={this.props.onSelect}
                                /> 
                            : null;
        
        let propertiesView = this.props.selectedPerson.id 
                            ? <CRMPersonPropertiesView 
                                person={this.props.selectedPerson}
                                /> 
                            : null;

        return (
            <View style={[this.props.style, {}]}>
                <View style={{flex: 1}}>
                    { familyTreeView }
                </View>
                <View style={{
                        flex: 1,
                        borderTopColor: '#E4E4E4',
                        borderTopWidth: StyleSheet.hairlineWidth,
                        padding: 10
                    }}
                >
                    { propertiesView }
                </View>
            </View>
        )
    }
}