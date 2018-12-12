import React, {Component} from 'react';
import {ScrollView, Image, Platform, AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SQLite from "react-native-sqlite-storage";

var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class Drawer extends Component {
    constructor() {
        super();
        this.state = {
            tests: [],
        }

    }

    componentDidMount() {
        this.downloadDataFromDatabase(db);
    }

    newScreen = (screen) => {
        Navigation.mergeOptions('drawerId', {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: screen
            }
        })
    };

    newScreen2 = (screen, id, name) => {
        Navigation.mergeOptions('drawerId', {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        });
        Navigation.push('MAIN_STACK', {
            component: {
                name: screen,
                passProps: {
                    id: id,
                    nameTestProps: name,
                },
            }
        })
    };

    downloadDataFromDatabase = (db) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM main.descriptionTest;', [], (tx, results) => {
                var tests = [];
                for (let i = 0; i < results.rows.length; i++) {
                    tests[i] = results.rows.item(i);
                }
                this.setState({tests: tests});
            });
        });
    };

    render() {

        let rows = [];
        for (let i = 0; i < this.state.tests.length; i++) {
            rows.push(
                <View key={i} style={styles.view}>
                    <TouchableOpacity style={styles.button} key={i}
                                      onPress={() => this.newScreen2('Tests', this.state.tests[i].id, this.state.tests[i].name)}>
                        <Text style={styles.buttonText}>{this.state.tests[i].name}</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageTitle}>
                    <Image style={styles.image}
                           source={{uri: 'https://cdn.pixabay.com/photo/2017/02/11/22/38/quiz-2058883_960_720.png'}}/>
                </View>

                <View syle={styles.navigationApp}>

                    <TouchableOpacity style={styles.buttonNavigation} onPress={() => this.newScreen('App')}>
                        <Text style={styles.buttonText}>Strona głowna</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNavigation} onPress={() => this.newScreen('Results')}>
                        <Text style={styles.buttonText}>Wyniki</Text>
                    </TouchableOpacity>
                </View>

                {rows}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E2E2',
        flexDirection: 'column'

    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        marginBottom: 20,
        color: 'black'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5

    },
    buttonNavigation: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        backgroundColor: '#A399A7',
        borderRadius: 5

    },
    buttonText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center'
    },
    navigationApp: {

        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 3,

    },
    tests: {
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 100,
    },
    imageTitle: {
        marginTop: 10,
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 3,


    }
});
