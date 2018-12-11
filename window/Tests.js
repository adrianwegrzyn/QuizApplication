import React, {Component} from 'react';
import {ListView, TouchableOpacity, Button, Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { Question} from "./Question";
import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class Tests extends Component{


    constructor() {
        super();
        this.state = {
            refreshing: false,
            tests: []
        };

        this.currentQuestion = 0;
        this.testLength = 3;
        this.score = 0;
    }

    componentDidMount() {
        this._selectDataFromTable();
        this.downloadDataFromDatabase();
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
                console.log(results.rows.item(5));


            });
        });
    }


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

    _onRefresh = () => {
        this.setState({refreshing: true});
        // this.fetchData().then(() => {
        // });
        setTimeout(()=> {
            this.currentQuestion++;
            this.setState({refreshing: false});

        }, 500)
    };

    next = () => {
        if(this.testLength === this.currentQuestion){
            this.sendResult();
            Navigation.push('MAIN_STACK',{

                component: {
                    name: 'ResultTest',
                    passProps: {
                        text: this.score
                    },
                }
            })
        }else{
            this.score++;
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

    sendResult = () => {
        fetch('https://pwsz-quiz-api.herokuapp.com/api/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: "Jasio",
                score: 5,
                total: 20,
                type: "historia",
                date: "2018-12-01"
            })
        });

    };





  render() {

      var test1 = [
          {
              question: 'Jak długo należy ręcznie stabilizować głowę poszkodowanego z podejrzeniem urazu kręgosłupa szyjnego?',
              answer_A: 'Aż zacznie nią poruszać  ',
              answer_B: 'Do przejęcia stabilizacji przez członka zespołu ratownictwa medycznego. @',
              answer_C: 'Do czasu stwierdzenia ruchomości jego nóg',
              answer_D: 'Inne',
              goodAnswer: 'b'
          },
          {
              question: 'Jesteś świadkiem potrącenia pieszego. Jak powinieneś się zachować?',
              answer_A: 'Nie podejmować działań, gdyż pomocy musi udzielić sprawca wypadku.@',
              answer_B: 'Wezwać pomoc drogową.',
              answer_C: 'Zatrzymać się, wezwać pomoc medyczną i udzielić pierwszej pomocy poszkodowanemu.',
              answer_D: 'Inne',
              goodAnswer: 'b'
          },
          {
              question: 'Która z wymienionych czynności może zwiększyć bezpieczeństwo podczas jazdy po zaśnieżonej drodze?',
              answer_A: 'Hamowanie wyłącznie przy użyciu hamulca ręcznego.',
              answer_B: 'Stosowanie opon zimowych.',
              answer_C: 'Zdecydowane przyspieszenie.@',
              answer_D: 'Inne',
              goodAnswer: 'c'
          },
          {
              question: 'Jaki minimalny odstęp od pojazdu poprzedzającego powinieneś zachować, stojąc w tunelu, w zatorze drogowym tzw korku?',
              answer_A: '3m',
              answer_B: '5m@',
              answer_C: '7m',
              answer_D: 'Inne',
              goodAnswer: 'b'
          }
      ];

      var test2 = [
          {
              question: '-----Jak długo należy ręcznie stabilizować głowę poszkodowanego z podejrzeniem urazu kręgosłupa szyjnego?',
              answer_A: 'Aż zacznie nią poruszać  ',
              answer_B: 'Do przejęcia stabilizacji przez członka zespołu ratownictwa medycznego. @',
              answer_C: 'Do czasu stwierdzenia ruchomości jego nóg',
              answer_D: 'Inne'
          },
          {
              question: '-------Jesteś świadkiem potrącenia pieszego. Jak powinieneś się zachować?',
              answer_A: 'Nie podejmować działań, gdyż pomocy musi udzielić sprawca wypadku.@',
              answer_B: 'Wezwać pomoc drogową.',
              answer_C: 'Zatrzymać się, wezwać pomoc medyczną i udzielić pierwszej pomocy poszkodowanemu.',
              answer_D: 'Inne'
          },
          {
              question: '---------Która z wymienionych czynności może zwiększyć bezpieczeństwo podczas jazdy po zaśnieżonej drodze?',
              answer_A: 'Hamowanie wyłącznie przy użyciu hamulca ręcznego.',
              answer_B: 'Stosowanie opon zimowych.',
              answer_C: 'Zdecydowane przyspieszenie.@',
              answer_D: 'Inne'
          },
          {
              question: '-----Jaki minimalny odstęp od pojazdu poprzedzającego powinieneś zachować, stojąc w tunelu, w zatorze drogowym tzw korku?',
              answer_A: '3m',
              answer_B: '5m@',
              answer_C: '7m',
              answer_D: 'Inne'
          }
      ];






    return (
      <View style={styles.container}>
          <View style={styles.toolbar}>
              <Icon.Button style={{flex:1, margin: 5}} name="bars" backgroundColor="#46597a" color="black" size={30} onPress={this.goToDrawer}/>
              <Text style={{flex:1, marginLeft: 50, fontSize:25}}>Test</Text>
          </View>
          <View style={{alignItems: 'center', textAlign: 'center', padding: 10, flex:1}}>
              <Text style={{alignItems: 'center'}}>Pytanie {this.currentQuestion + 1} z {test1.length}</Text>
              <Text style={{color:'black', fontSize: 20,}}>{test1[this.currentQuestion].question}</Text>
          </View>
          <View style={styles.questions}>
              <TouchableOpacity style={styles.button} onPress={() => this.next()}>
                  <Text>
                      {test1[this.currentQuestion].answer_A}
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.next()}>
                  <Text>
                      {test1[this.currentQuestion].answer_B}
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.next()}>
                  <Text>
                      {test1[this.currentQuestion].answer_C}
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.next()}>
                  <Text>
                      {test1[this.currentQuestion].answer_D}
                  </Text>
              </TouchableOpacity>
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
