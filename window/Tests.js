import React, {Component} from 'react';
import {ListView, TouchableOpacity, Button, Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { Question} from "./Question";
import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~database.db'});

export default class Tests extends Component{


    constructor() {
        super();
        this.state = {
            refreshing: false,
            tests: [
                {
                    question: 'przed pobraniem',
                    answers: {
                        content: 'przec pobraniem',
                        isCorrect: false
                    }
                }
            ]
        };

        this.currentQuestion = 0;
        this.testLength = 0;
        this.score = 0;
    }

    componentDidMount() {
        this._selectDataFromTable();
        //this.downloadDataFromDatabase();
    }


    _selectDataFromTable(){
        db.transaction((tx) => {
            tx.executeSql('SELECT tasks FROM main.tests WHERE id = ?',[this.props.id]  , (tx, results) => {
                // var len = results.rows.length;
                // console.log("dlugosc: ", len);
                // console.log("1asdasdd: " + JSON.stringify(results.rows.item(0).tasks));
                // console.log("2asdsad: " + results.rows.item(0).tasks);

                //let tests = JSON.parse(results.rows.item(0));
                //console.log("123123d: " + tests);
                this.setState({refreshing: true});
                this.setState({ tests: JSON.parse(results.rows.item(0).tasks) });
                this.testLength = this.state.tests.length;
                this.setState({refreshing: false});
            });

        });
    }





    _onRefresh = () => {
        this.setState({refreshing: true});
        // this.fetchData().then(() => {
        // });
            this.currentQuestion++;

        this.setState({refreshing: false});

    };

    next = (isCorrect) => {
        if(this.testLength === this.currentQuestion+1){
            Navigation.push('MAIN_STACK',{

                component: {
                    name: 'ResultTest',
                    passProps: {
                        text: this.score
                    },
                }
            })
        }else{
            if( isCorrect ) {
                this.score++;
            }
            this._onRefresh();
        }

    };

    goToDrawer = () => {
        Navigation.mergeOptions('drawerId', {
            sideMenu:{
                left:{
                    visible:true
                }
            }
        })
    };





  render() {



      let rowsAnswers = [];

          for (let i = 0; i < this.state.tests[0].answers.length; i++) {
              rowsAnswers.push(

                  <TouchableOpacity key={i} style={styles.button}
                                    onPress={() => this.next(this.state.tests[this.currentQuestion].answers[i].isCorrect)}>
                      <Text>
                          {this.state.tests[this.currentQuestion].answers[i].content}
                      </Text>
                  </TouchableOpacity>
              );
          }


    return (
      <View style={styles.container}>
          <View style={styles.toolbar}>
              <Icon.Button style={{flex:1, margin: 5}} name="bars" backgroundColor="#46597a" color="black" size={30} onPress={this.goToDrawer}/>
              <Text style={{flex:1, marginLeft: 50, fontSize:25}}>Test</Text>
          </View>
          <View style={{alignItems: 'center', textAlign: 'center', padding: 10, flex:1}}>
              <Text style={{alignItems: 'center'}}>Pytanie {this.currentQuestion + 1} z {this.testLength}</Text>
              <Text style={{alignItems: 'center'}}>Aktualna ilość punktów: {this.score}</Text>
              <Text style={{color:'black', fontSize: 20,}}>{this.state.tests[this.currentQuestion].question}</Text>
          </View>
          <View style={styles.questions}>
              {rowsAnswers}
          </View>
      </View>
    );
  }




}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#46597a',
        justifyContent: 'center',
        height: 60,
    },
    questions: {
        margin: 10,
        borderColor: 'black',
        borderWidth: 3,
        alignItems: 'center',
        flex:2
    },
    button: {
        flex:1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#71BBD0',
        borderWidth: 1,
        padding: 30,
        margin: 10,
        backgroundColor: '#71BBD0',
        borderRadius:5

    },

});
