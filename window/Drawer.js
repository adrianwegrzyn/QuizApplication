import React, {Component} from 'react';
import {Button, ScrollView, Image, Platform, AppRegistry, StyleSheet, Text, View, } from 'react-native';
import { Navigation } from 'react-native-navigation';


export default class Drawer extends Component{
    newScreen = (screen) => {
        Navigation.mergeOptions('drawerId', {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        });
        Navigation.push('MAIN_STACK',{
            component: {
                name: screen
            }
        })
    };

  render() {
    return (
      <ScrollView style={styles.container}>
          <Text style={styles.welcome}>Quiz App</Text>

          <View syle={styles.navigationApp}>
              <Image style={styles.image} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
              <Button style={styles.button} title='Strona głowna' onPress={() => this.newScreen('App')}/>
              <Button style={styles.button} title='Wyniki' onPress={() => this.newScreen('Results')}/>
          </View>

          <View syle={styles.tests}>
              <Button style={styles.button} title='Test' onPress={() => this.newScreen('Tests')}/>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
      flexDirection: 'column'

  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
    button: {
      flex:2,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#545757',
        borderWidth: 1

    },
    navigationApp: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tests:{
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    }
});
