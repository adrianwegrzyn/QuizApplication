import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

export default class ResultTest extends Component{

    constructor() {
        super();
        this.state = {
            user: 'User'
        };
    }

    formatDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }


    sendResult = () => {
        fetch('https://pwsz-quiz-api.herokuapp.com/api/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: this.state.user,
                score: this.props.scoreTestProps,
                total: this.props.testLengthProps,
                type: this.props.nameTestProps,
                date: this.formatDate()
            })
        });
        Navigation.push(this.props.componentId, {
            component: {
                name: 'Results'
            }
        });
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.testSummary}>
                    <Text style={styles.instructions}> Nazwa testu: "{this.props.nameTestProps}"</Text>
                    <Text style={styles.welcome}>Twój wynik</Text>

                    <Text style={{textAlign: 'center', color: '#333333', marginBottom: 5, fontSize: 40}}>{this.props.scoreTestProps}</Text>
                </View>
                <View style={styles.sendResultButton}>
                    <Text style={{margin:10, fontSize: 20}}>Wpisz swoją nazwę używkownika: </Text>
                    <TextInput
                        style={{height: 40, width:280, borderColor: 'gray', borderWidth: 1, textAlign: 'center', marginBottom: 50,borderRadius:5, backgroundColor: '#92CDFF', fontSize: 18}}
                        onChangeText={(user) => this.setState({user})}
                        value={this.state.user}
                    />

                    <TouchableOpacity  style={styles.button} onPress={() => this.sendResult()}>
                        <Text style={{fontSize:25}}>Wyślij</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    button: {
        flex:1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 30,
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius:5,
    },
    testSummary: {
        padding: 30
    },
    sendResultButton: {
        alignItems: 'center'
    }
});
