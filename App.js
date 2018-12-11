import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, AsyncStorage, ListView, ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Regulations from './window/Regulations'
import Icon from 'react-native-vector-icons/FontAwesome';
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            clonedResults: [],
            refreshing: false,
            tests: []
        };
    }




    async componentDidMount() {
        // this._selectDataFromTable()
        SplashScreen.hide();
        try {
            const value = await AsyncStorage.getItem('databaseDownloadDate');
            if (value == null) {
                this.insertData();
            } else {
                let now = new Date();
                let then = new Date(JSON.parse(value).value);
                const utc1 = Date.UTC(then.getFullYear(), then.getMonth(), then.getDate());
                const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
                if (Math.floor((utc2 - utc1) / 86400000) >= 1) {
                    this.insertData();
                } else {
                    this.downloadDataFromDatabase(db);
                }
            }
        } catch (error) {
        }

        // this._selectDataFromTable()

    }


    _selectDataFromTable(){
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM main.tests',[], (tx, results) => {
                var len = results.rows.length;
                console.log("dlugosc: ", len);
                console.log(results.rows.item(0));
                console.log(results.rows.item(1));
                console.log(results.rows.item(2));
                console.log(results.rows.item(3));
                console.log(results.rows.item(4));


            });
        });
    }



    insertData = () => {
        db.transaction((tx) => {
            fetch("https://pwsz-quiz-api.herokuapp.com/api/tests")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({tests: responseJson});
                    this.addTestsToDatabase(db, responseJson);
                    this.downloadTestData();
                    // _.forEach(this.tests, function (x) {
                    //     // console.log(x.name);
                    //     tx.executeSql('INSERT INTO main.descriptionTest(id, name, description, tags, level, numberOfTasks) VALUES (?, ?, ?, ?, ?, ?)',
                    //         [x.id, x.name, x.description, x.tags, x.level, x.numberOfTasks])
                    // });

                });
        })
    };


    addTestsToDatabase = (db, data) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM descriptionTest; DELETE FROM test; VACUUM;', [], (tx, results) => {
            });
            for (let i = 0; i < data.length; i++) {
                tx.executeSql(
                    'INSERT INTO descriptionTest (id, name, description, tags, level, numberOfTasks) VALUES (?, ?, ?, ?, ?, ?);',
                    [data[i].id, data[i].name, data[i].description, JSON.stringify(data[i].tags), data[i].level, data[i].numberOfTasks]
                );
            }
        });
    };

    downloadTestData = () => {
        for (let i = 0; i < this.state.tests.length; i++) {
            fetch('https://pwsz-quiz-api.herokuapp.com/api/test/' + this.state.tests[i].id)
                .then((data) => data.json())
                .then((d) => {
                    db.transaction((tx) => {
                        tx.executeSql(
                            'INSERT INTO tests (id, name, description, level, tasks, tags) VALUES (?, ?, ?, ?, ?, ?);',
                            [d.id, d.name, d.description, JSON.stringify(d.level), JSON.stringify(d.tasks), JSON.stringify(d.tags)]
                        );
                    });
                    AsyncStorage.setItem('databaseDownloadDate', JSON.stringify({"value": Date()}));
                })
                .catch((error) => {
                    this.setState({internetConnection: false});
                    alert('Błąd podczas pobierania danych szczegółowych testów.\nSprawdź połączenie z internetem!');
                });
        }
    };

    downloadDataFromDatabase = (db) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM main.descriptionTest;', [], (tx, results) => {
                var tests = [];
                for(let i = 0; i < results.rows.length; i++) {
                    tests[i] = results.rows.item(i);
                }
                this.setState({ tests: tests });
            });
        });
    };


    newWindow = (window) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: window
            }
        });
    };

    newWindow2 = (window, id) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: window,
                passProps: {
                    text: id
                },
            }
        });
    };


    goToDrawer = () => {
        Navigation.mergeOptions('drawerId', {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        })
    };


    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <View>
        //             <ActivityIndicator/>
        //         </View>
        //     )
        // }

        let rows = [];
        for (let i = 0; i < this.state.tests.length; i++) {
            rows.push(
                <View key={i} style={styles.view}>
                    <TouchableOpacity style={styles.testButton} key={i}
                                      onPress={() => this.newWindow2('Tests', this.state.tests[i].id)}>
                        <Text style={styles.titleTest}>{this.state.tests[i].name}</Text>
                        <Text style={styles.tagsTest}>
                            {_.map(JSON.parse(this.state.tests[i].tags), x => ('#' + x + ' '))}
                        </Text>
                        <Text style={styles.descriptionTest}>
                            {this.state.tests[i].description}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (

            <View style={styles.container}>

                <Regulations pagekey={"uniquekey"} title={"Regulamin"}
                             description={"Reulamin używania Quizu"}/>

                <View style={styles.toolbar}>
                    <Icon.Button style={{flex: 1, margin: 5}} name="bars" backgroundColor="#46597a" color="black"
                                 size={30} onPress={this.goToDrawer}/>
                    <Text style={{flex: 1, marginLeft: 50, fontSize: 25}}>Strona głowna </Text>
                </View>

                <ScrollView style={styles.appScreen}>
                    {rows}

                    <View style={styles.check}>
                        <Text style={styles.checkText}>
                            Chcesz sprawdzić swój wynik ?
                        </Text>
                        <TouchableOpacity style={styles.checkButton} onPress={() => this.newWindow('Results')}>
                            <Text>Sprawdź</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E2E2',
    },

    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#46597a',
        justifyContent: 'center',
        height: 60,
    },

    appScreen: {
        flex: 8,
    },

    Ranga: {

        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
    },
    testButton: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#71BBD0',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        backgroundColor: '#71BBD0',
        borderRadius: 5,
    },
    checkButton: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#71BBD0',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        backgroundColor: '#71BBD0',
        borderRadius: 5,
    },
    check: {
        flex: 1,
        borderColor: '#000000',
        borderWidth: 1,
        margin: 10,
        alignItems: 'center'
    },
    checkText: {
        padding: 5,
        fontSize: 20

    },
    titleTest: {
        fontSize: 22,
        margin: 6

    },
    tagsTest: {
        fontSize: 11,
        color: 'blue',
        margin: 6
    },
    descriptionTest: {
        fontSize: 14,
        margin: 6
    }

});
