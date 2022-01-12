import React, {useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {View, StyleSheet, ScrollView} from 'react-native';

const tableHead = ['Sr#', 'Name', 'Marks'];
// const tableData = [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];

const Tabletech = ({navigation, route}) => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);

  let temp = [];
  useEffect(() => {
    setData(route.params.data);
    navigation.setOptions({
      title:"Assignment Record",
      headerTintColor:"white",
      headerStyle:{
        backgroundColor:"rgba(0, 0, 0, 0.3)"
       
      }
    })
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}></Row>
        <Rows data={tableData} textStyle={styles.text}></Rows>
      </Table>
      {data != undefined && tableData.length < data.length ? (
        <View>
          {data.forEach((element, index) => (
            <View key={index}>
              {(temp = [])}
              {temp.push(index + 1)}
              {temp.push(element.email)}
              {temp.push(element.marks)}
              {/* {setTableData(tableData.push(temp))} */}
              {tableData.push(temp)}
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    paddingTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
});

export default Tabletech;
