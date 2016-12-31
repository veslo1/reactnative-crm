import React, { Component } from 'react';
import { 
    View,
    Navigator,
    StatusBar
} from 'react-native';
import MyScene from './MyScene';

export default class SimpleNavigationApp extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="red"
                    barStyle="dark-content"
                />
                <Navigator
                    initialRoute={{statusBarHidden: true}}
                    initialRoute={{title: 'My Initial Scene', index: 0}}
                    renderScene={(route, navigator) => <MyScene
                            title={route.title}

                            //Founction to call when a new scene should be displayed
                            onForward={() => {
                                const nextIndex = route.index + 1;
                                navigator.push({
                                    title: 'Scene ' + nextIndex,
                                    index: nextIndex,
                                })
                            }}

                            //Founction to call to go back to the previous scene
                            onBack={() => {
                                if (route.index > 0) {
                                    navigator.pop();
                                }
                            }}
                        />
                    }
                />
            </View>
        )
    }
}