import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, ActivityIndicator} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Regulations from './window/Regulations'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Row} from "react-native-table-component";





export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            clonedResults: [],
            refreshing: false,
        };
    }

  componentDidMount(){
      fetch("https://pwsz-quiz-api.herokuapp.com/api/tests")
          .then((response) => response.json())
          .then((responseJson) => {
              var standardDataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
              this.setState({
                  isLoading: false,
                  clonedResults: standardDataSource.cloneWithRows(responseJson)
              })
          });
    SplashScreen.hide();
  }



  newWindow = (window) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: window
        }
    });
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
      if(this.state.isLoading){
          return(
              <View>
                  <ActivityIndicator />
              </View>
          )
      }

    return (

          <View style={styles.container}>

              <Regulations pagekey={"uniquekey"} title={"Regulamin"}
                           description={"Reulamin używania Quizu"}/>

              <View style={styles.toolbar}>
                  <Icon.Button style={{flex:1, margin: 5}} name="bars" backgroundColor="#46597a" color="black" size={30} onPress={this.goToDrawer}/>
                  <Text style={{flex:1, marginLeft: 50, fontSize:25}}>Strona głowna </Text>
              </View>

              <ScrollView style={styles.appScreen}>
                  <ListView
                      dataSource = {this.state.clonedResults}
                      renderRow = {
                          (rowData) =>
                              <TouchableOpacity onPress={() => this.newWindow('Tests')} style={styles.testButton}>
                                  <Text style={styles.titleTest}>
                                      {rowData.name}
                                  </Text>
                                  <Text style={styles.tagsTest}>
                                       {_.map(rowData.tags, x => ('#' + x + ' ' ))}
                                  </Text>
                                  <Text style={styles.descriptionTest}>
                                      {rowData.description}
                                  </Text>
                              </TouchableOpacity>
                      }/>
                  <View style={styles.check}>
                      <Text style={styles.checkText}>
                          Chcesz sprawdzić swój wynik ?
                      </Text>
                      <TouchableOpacity style={styles.checkButton}  onPress={() => this.newWindow('Results')}>
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
      flex:8,
    },

    Ranga: {

        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
    },
    testButton: {
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#71BBD0',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        backgroundColor: '#71BBD0',
        borderRadius:5,
    },
    checkButton: {
            flex:1,
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'center',
            borderColor: '#71BBD0',
            borderWidth: 1,
            padding: 5,
            margin: 10,
            backgroundColor: '#71BBD0',
            borderRadius:5,
    },
    check: {
      flex:1,
        borderColor: '#000000',
        borderWidth: 1,
        margin:10,
        alignItems: 'center'
    },
    checkText: {
      padding: 5,
        fontSize:20

    },
    titleTest: {
      fontSize: 22,
        margin:6

    },
    tagsTest: {
      fontSize: 11,
        color: 'blue',
        margin:6
    },
    descriptionTest: {
      fontSize:14,
        margin:6
    }

});
