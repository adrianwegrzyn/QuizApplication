import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl ,ListView, ActivityIndicator} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from "react-native-vector-icons/FontAwesome";
import {Navigation} from "react-native-navigation";


export default class Results extends Component{
    constructor() {
        super();
        this.state = {
            isLoading: true,
            clonedResults: [],
            refreshing: false,
        };
    }

    goToDrawer = () => {
        Navigation.mergeOptions('drawerId', {
            sideMenu:{
                left:{
                    visible:true
                }
            }
        })
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        return this.fetchData().then(() => {
            this.setState({refreshing: false});
        });

    };

    fetchData() {
        return fetch("https://pwsz-quiz-api.herokuapp.com/api/results")
            .then((response) => response.json())
            .then((responseJson) => {
                var standardDataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    clonedResults: standardDataSource.cloneWithRows(responseJson)
                })
            })

    }

    componentDidMount() {
            fetch("https://pwsz-quiz-api.herokuapp.com/api/results")
                .then((response) => response.json())
                .then((responseJson) => {
                    var standardDataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
                    // var results = [
                    //     {
                    //         nick: 'Marek',
                    //         score: 18,
                    //         total: 20,
                    //         type: 'historia',
                    //         date: '2018-11-22'
                    //     },
                    //     {
                    //         nick: 'Marcin',
                    //         score: 19,
                    //         total: 20,
                    //         type: 'kultura',
                    //         date: '2018-11-24'
                    //     }
                    // ];
                    // this.state.cloneMovies = standardDataSource.cloneWithRows(responseJson.results);
                    this.setState({
                        isLoading: false,
                        clonedResults: standardDataSource.cloneWithRows(responseJson)
                    })
                })
    }


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
            <View style={styles.toolbar}>
                <Icon.Button style={{flex:1, margin: 5}} name="bars" backgroundColor="#46597a" color="black" size={30} onPress={this.goToDrawer}/>
                <Text style={{flex:1, marginLeft: 50, fontSize:25}}>Wyniki </Text>
            </View>
              <ScrollView
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={this._onRefresh}/>
                          }>
                  <Table style={{margin: 10}}>
                      <Row data={['Nick', 'Wynik', 'Suma', 'Typ', 'Data']} flexArr={[1.25, 1, 1, 1.75, 1.75]} style={styles.head} textStyle={styles.textColumnName}/>
                        <ListView
                            dataSource = {this.state.clonedResults}
                            renderRow = {
                            (rowData) => <Row data={[rowData.nick, rowData.score, rowData.total, rowData.type,rowData.date]} flexArr={[1.25, 1, 1, 1.75, 1.75]}  textStyle={styles.text}/>
                        }/>

                  </Table>
              </ScrollView>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    head: { height: 40, backgroundColor: '#534535' },
    text: { margin: 6 },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#46597a',
        justifyContent: 'center',
        height: 60,
    },
    textColumnName: { margin: 6, backgroundColor: '#534535' },
});
