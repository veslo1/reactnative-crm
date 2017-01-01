import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    StyleSheet
} from 'react-native';

export default class CRMListView extends Component {

    render() {

        console.log(this.props.selectedPerson);

        return (
            <View style={[this.props.style, { backgroundColor: '#FAFAFC' }]}>
                <ListView
                    dataSource={this.props.list}
                    renderRow={person => (
                        <View
                            style={{
                                height: 65,
                                padding: 12,
                                backgroundColor: person.id == this.props.selectedPerson.id ? '#E4E4E4' : '#FAFAFC',
                                borderBottomColor: '#E4E4E4',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                flexDirection: 'row'
                            }}
                            onPress={this.props.onSelect(person)}
                        >
                            <Image
                                source={{
                                    uri: person.image
                                }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 4,
                                    marginRight: 12
                                }}
                                />
                            <View style={{ flex: 1 }}>
                                <Text style={{ flex: 1, fontSize: 12 }} numberOfLines={1}>{person.name}</Text>
                                <Text style={{ flex: 1, fontSize: 10, color: '#666' }} numberOfLines={1}>Age: {person.age}</Text>
                            </View>
                        </View>
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