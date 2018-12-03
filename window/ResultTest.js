import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';


class ResultTest extends Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>Twój wynik</Text>
                <Text></Text>
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
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
