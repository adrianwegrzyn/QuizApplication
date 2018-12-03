import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl ,ListView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class Results extends Component{
    constructor() {
        super();
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        // this.fetchData().then(() => {
        // });
        setTimeout(()=> {
            this.setState({refreshing: false});

        }, 3000)
    };

    fetchData() {

    }


    render() {



      var standardDataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
      var results = [
        {
            nick: 'Marek',
            score: 18,
            total: 20,
            type: 'historia',
            date: '2018-11-22'
        },
        {
            nick: 'Marcin',
            score: 19,
            total: 20,
            type: 'kultura',
            date: '2018-11-24'
        }
    ];
    var clonedResults = standardDataSource.cloneWithRows(results);
    return (
      <ScrollView style={styles.container}
                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}/>
                  }>
          <Table>
              <Row data={['Nick', 'Wynik', 'Suma', 'Typ', 'Data']} style={styles.head} textStyle={styles.text}/>
                <ListView
                    dataSource = {clonedResults}
                    renderRow = {
                    (rowData) => <Row data={[rowData.nick, rowData.score, rowData.total, rowData.type,rowData.date]}  textStyle={styles.text}/>
                }/>

          </Table>


          <Text>NIE DOTYKAC TABELI</Text>
          <Text>DO NOT TOUCH TABLE</Text>
          <Text>請勿觸摸桌子</Text>
          <Text>NO TOQUE LA TABLA</Text>
      </ScrollView>
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
    Text: {
      padding: 40
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});
