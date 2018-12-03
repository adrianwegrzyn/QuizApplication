import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Regulations from './window/Regulations'
import Icon from 'react-native-vector-icons/FontAwesome';




export default class App extends Component {

  componentDidMount(){
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
  }




  render() {
    return (

          <View style={styles.container}>

              <Regulations pagekey={"uniquekey"} title={"Regulamin"}
                           description={"Reulamin używania Quizu"}/>

              <View style={styles.toolbar}>
                  <Icon.Button style={{flex:1, textAlign: 'center'}} name="bars" backgroundColor="#FFFFFF" color="black" size={30} onPress={this.goToDrawer}/>
                  <Text style={{flex:2, marginLeft:30}}>Strona głowna </Text>
              </View>

              <View style={styles.appScreen}>
                  <Text>gfdgsf</Text>
                  <Text style={styles.Ranga}>gfdgsf</Text>
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

    toolbar: {
      flex:1,
        alignItems: 'stretch',
        flexDirection: 'row',
    },

    appScreen: {
      flex:8,
    },

    Ranga: {

        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
    }
});
