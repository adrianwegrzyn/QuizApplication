import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';

export default class ResultTest extends Component{


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Twój wynik</Text>
                <Text style={styles.instructions}>{this.props.text}</Text>
</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 18
    },
});
