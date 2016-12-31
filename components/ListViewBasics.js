import React, { Component } from 'react';
import {
    ListView,
    View,
    Text
} from 'react-native';

import getMoviesFromApiAsync from './getMoviesFromApiAsync';

class ListViewBasics extends Component {
    // Initialize the hardcoded data 
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        }
    }

    componentDidMount() {
        getMoviesFromApiAsync().then(movies => {
            console.log(movies);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                dataSource: ds.cloneWithRows(movies.map(movie => `${movie.title} ${movie.releaseYear}`))
            })
        })
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={rowData => <Text>{rowData}</Text>}
                />
            </View>
        );
    }
}

export default ListViewBasics;