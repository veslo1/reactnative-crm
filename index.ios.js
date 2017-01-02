import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import CRMBasics from './components/CRM/CRMBasics'

class CRMAPP extends Component {
    render() {
        return (
            <CRMBasics></CRMBasics>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => CRMAPP);