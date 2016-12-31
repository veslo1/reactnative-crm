import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import Bananas from './components/Bananas'
import LotsOfGreeting from './components/LotsOfGreetings'
import BlinkApp from './components/BlinkApp'
import styles from './components/styles'
import LotsOfStyles from './components/LotsOfStyles'
import FixedDimensionsBasics from './components/FixedDimensionsBasics'
import FlexDimensionsBasics from './components/FlexDimensionsBasics'
import FlexDirectionBasics from './components/FlexDirectionBasics'
import JustifyContentBasics from './components/JustifyContentBasics'
import AlignItemsBasics from './components/AlignItemsBasics'
import PizzaTranslator from './components/PizzaTranslator'
import IScrolledDownAndWhatHappenedNextShockedMe from './components/IScrolledDownAndWhatHappenedNextShockedMe'
import ListViewBasics from './components/ListViewBasics'
import SimpleNavigationApp from './components/SimpleNavigationApp'

class HelloWorldApp extends Component {
    render() {
        return (
            // <View style={styles.flexbox}>
            //     <Text>Hello world!</Text>
            //     <Bananas/>
            //     <LotsOfGreeting style={styles.flexbox}/>
            // </View>
            // <BlinkApp/>
            // <LotsOfStyles/>
            // <FixedDimensionsBasics></FixedDimensionsBasics>
            // <FlexDimensionsBasics></FlexDimensionsBasics>
            // <FlexDirectionBasics></FlexDirectionBasics>
            // <JustifyContentBasics></JustifyContentBasics>
            // <AlignItemsBasics></AlignItemsBasics>
            // <PizzaTranslator></PizzaTranslator>
            // <IScrolledDownAndWhatHappenedNextShockedMe></IScrolledDownAndWhatHappenedNextShockedMe>
            // <ListViewBasics></ListViewBasics>
            <SimpleNavigationApp></SimpleNavigationApp>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp);