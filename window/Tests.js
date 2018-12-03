import React, {Component} from 'react';
import {ListView, Button, Platform, StyleSheet, Text, View} from 'react-native';
import { Question} from "./Question";
import {Navigation} from "react-native-navigation";


export default class Tests extends Component{


    constructor() {
        super();
        this.state = {
            refreshing: false,
        };

        this.currentQuestion = 0;
        this.testLength = 3;
        this.score = 0;
    }

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
            Navigation.push('MAIN_STACK',{
                component: {
                    name: 'Results'
                }
            })
        }else{
            this.score++;
            this._onRefresh();
        }

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
          <View>
              <Text>Pytanie {this.currentQuestion + 1} z {test1.length}</Text>
              <Text style={{color:'black'}}>{test1[this.currentQuestion].question}</Text>
              <Button title={test1[this.currentQuestion].answer_A} onPress={() => this.next()}/>
              <Button title={test1[this.currentQuestion].answer_B} onPress={() => this.next()}/>
              <Button title={test1[this.currentQuestion].answer_C} onPress={() => this.next()}/>
              <Button title={test1[this.currentQuestion].answer_D} onPress={() => this.next()}/>
          </View>

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
});
