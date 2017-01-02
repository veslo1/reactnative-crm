import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import SearchBar from 'react-native-search-bar';

const styles = StyleSheet.create({
    sortBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        marginRight: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E4E4E4',
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    sortBtnActive: {
        backgroundColor: '#FFF'
    },
    sortByText: {
        fontSize: 10
    }
});

export default class CRMListView extends Component {
    constructor(props) {
        super(props);

        this.sortOrderCandidates = ['ascending', 'descending', ''];

        this.state = {
            searchText: '',
            sortKey: '',
            sortOrder: '',
            list: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    onSearchTextChange(newSearchText) {
        newSearchText = newSearchText.trim();
        if (newSearchText == this.state.searchText) return;

        let newState = {
            searchText: newSearchText
        };
        this.filterAndSortListByPropsWithNewState(this.props, newState);
    }

    toggleSortBy(sortKey) {
        let newState = {}
        if (sortKey == this.state.sortKey) {
            //toggle sort order
            newState.sortOrder = this.sortOrderCandidates[
                (this.sortOrderCandidates.indexOf(this.state.sortOrder) + 1) % this.sortOrderCandidates.length
            ]
        } else {
            //set new sort key
            newState.sortKey = sortKey;
            newState.sortOrder = 'ascending';
        }
        this.filterAndSortListByPropsWithNewState(this.props, newState)
    }

    filterAndSortListByPropsWithNewState(props, newState) {
        //update selectedPerson in listView
        newState = Object.assign({}, this.state, newState);

        let persons = props.persons;
        let filteredPersons = props.persons.filter(
            person => {
                //filter by searchText
                return newState.searchText 
                        ? person.name.toLowerCase().indexOf(newState.searchText.toLowerCase()) > -1 
                        : true;
            }
        ).map(
            person => (
                person.id === this.props.selectedPerson.id || person.id === props.selectedPerson.id
                ? {...person}
                : person
            )
        ).sort(
            (person1, person2) => {
                //Todo: sort by name/age in ascending/descending order
                let result = (
                    person1[newState.sortKey] > person2[newState.sortKey] 
                    ? 1
                    : person1[newState.sortKey] < person2[newState.sortKey]
                    ? -1
                    : 0
                );

                result = (
                    result 
                    ? result
                    : person1.id > person2.id
                    ? 1
                    : -1
                );

                result = result * (
                    newState.sortOrder == 'ascending'
                    ? 1
                    : newState.sortOrder == 'descending'
                    ? -1
                    : 0
                );

                return result;
            }
        );

        this.setState(Object.assign({}, newState, {
            list: this.state.list.cloneWithRows(filteredPersons)
        }));
    }

    componentWillReceiveProps(newProps) {
        this.filterAndSortListByPropsWithNewState(newProps);
    }

    render() {
        return (
            <View style={[this.props.style, { backgroundColor: '#FAFAFC' }]}>
                <View>
                    <SearchBar
                        ref='searchBar'
                        placeholder='Search'
                        onChangeText={this.onSearchTextChange.bind(this)}
                    />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 3, paddingBottom: 3}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{
                            fontSize: 10,
                            color: '#666'
                        }}>Sort By </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.toggleSortBy('name')}>
                        <View style={[styles.sortBtn, this.state.sortKey == 'name' && this.state.sortOrder ? styles.sortBtnActive : null]}>
                            <Text style={styles.sortByText}>Name{ 
                                this.state.sortKey != 'name'
                                ? ''
                                : this.state.sortOrder == 'ascending' 
                                ? ' ↑' 
                                : this.state.sortOrder == 'descending' 
                                ? ' ↓'
                                : ''
                            }</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.toggleSortBy('age')}>
                        <View style={[styles.sortBtn, this.state.sortKey == 'age' && this.state.sortOrder ? styles.sortBtnActive : null]}>
                            <Text style={styles.sortByText}>Age{ 
                                this.state.sortKey != 'age'
                                ? ''
                                : this.state.sortOrder == 'ascending' 
                                ? ' ↑' 
                                : this.state.sortOrder == 'descending' 
                                ? ' ↓'
                                : ''
                            }</Text>
                        </View>
                    </TouchableWithoutFeedback>    
                </View>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.list}
                    renderRow={person => (
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.onSelect(person);
                        }}>
                            <View
                                style={{
                                    height: 65,
                                    padding: 12,
                                    backgroundColor: person.id == this.props.selectedPerson.id ? '#E4E4E4' : '#FAFAFC',
                                    borderBottomColor: '#E4E4E4',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    flexDirection: 'row'
                                }}
                            >
                                <Image
                                    source={{
                                        uri: person.image
                                    }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 4,
                                        marginRight: 12,
                                        backgroundColor: '#DDD',
                                    }}
                                    />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ flex: 1, fontSize: 12 }} numberOfLines={1}>{person.name}</Text>
                                    <Text style={{ flex: 1, fontSize: 10, color: '#666' }} numberOfLines={1}>Age: {person.age}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    />
            </View>
        )
    }
}

CRMListView.propTypes = {
    style: PropTypes.object,
    persons: PropTypes.array.isRequired,
    selectedPerson: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}