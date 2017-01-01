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
    sortText: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E4E4E4',
        fontSize: 10
    }
});

export default class CRMListView extends Component {

    render() {

        console.log(this.props.selectedPerson);

        return (
            <View style={[this.props.style, { backgroundColor: '#FAFAFC' }]}>
                <View>
                    <SearchBar />
                </View>
                <TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.sortText}>Sort By Name ↑</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.sortText}>Sort By Age ↓</Text>
                    </View>
                </TouchableWithoutFeedback>    
                <ListView
                    enableEmptySections={true}
                    dataSource={this.props.list}
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
    list: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}