import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";

export default class Regulations extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false
      };
    }
      render() {
      return (
        <View>
          <Modal
            animationType={"slide"}
            transparent={true}
            style={styles.ftreContainer}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={styles.ftreContainer}>
              <View style={styles.ftreTitleContainer}>
                <Text style={styles.ftreTitle}>{this.props.title}</Text>
              </View>
              <View style={styles.ftreDescriptionContainer}>
                <Text style={styles.ftreDescription} allowFontScaling={true}>
                  {this.props.description}
                </Text>
              </View>
              <View style={styles.ftreExitContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <View style={styles.ftreExitButtonContainer}>
                    <Text style={styles.ftreExitButtonText}>Akceptuję</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

    componentDidMount() {
        AsyncStorage.getItem(this.props.pagekey, (err, result) => {
          if (err) {
          } else {
            if (result == null) {
              console.log("null value recieved", result);
              this.setModalVisible(true);
            } else {
              console.log("result", result);
            }
          }
        });
        AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
                console.log("error",err,"result",result);
                });
      }
      setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }
  }

  const styles = StyleSheet.create({
    ftreContainer:{
          backgroundColor:'white',
          flex:1,
          marginTop:70,
          marginBottom:40,
          marginLeft:20,
          marginRight:20,
          borderRadius:20,
          borderWidth:4,
          borderColor:'#FFFFFF'
      },
        ftreTitle:{
            color:'black',
            fontWeight:'bold',
            fontSize:20,
            textAlign:'center',
            margin:10,	
        },
        ftreDescription:{
            color:'black',
            fontSize:15,
            marginRight:20,
            marginLeft:20
        },
        ftreCloseIcon:{
            alignSelf:'flex-end',
            flex:0.5,
            marginRight:10
        },
        ftreTitleContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },
        ftreDescriptionContainer:{
            flex:6.5
        },
        ftreExitContainer:{
            flex:2,
            justifyContent:'flex-start',
            alignItems:'center',
        },
        ftreExitButtonContainer:{
            width:200,
            backgroundColor:'red',
            borderRadius:10,
            justifyContent:'center',
        },
        ftreExitButtonText:{
            color:'white',
            fontSize:20,
            fontWeight:'bold',
            textAlign:'center'
        }
    });