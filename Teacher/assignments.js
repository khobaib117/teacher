import React, {useState, useEffect, useCallback} from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import * as db from './db';
import AsyncStorage from '@react-native-async-storage/async-storage';

const assignment = ({navigation, route}) => {
  const [assignment, setAssignment] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getOnlineUser();
    navigation.setOptions({
      title:"Assignments",
      headerTintColor:"white",
      headerStyle:{
        backgroundColor:"rgba(0, 0, 0, 0.3)"
      }
    })
  }, []);
  useEffect(() => {
    setAssignment(db.default.getAssignments(email));
  }, []);
  const onRefresh = useCallback(async () => {
    getOnlineUser()
    setRefreshing(true);
    setAssignment(db.default.getAssignments(email));
    setRefreshing(false);
  });
  const getOnlineUser = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('email');
      let jsonValue1 = await AsyncStorage.getItem('name');
      if (jsonValue != null) {
        setEmail(JSON.parse(jsonValue));
        setName(JSON.parse(jsonValue1));
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100%', width: '100%'}}>
      {assignment != undefined  ? (
        <View>
          {assignment.length == 0 ? (
            <Text style={styles.NoAssign}>No assignment Uploaded</Text>
          ) : (
            <View>
              {assignment.map((item, index) => (
                <TouchableOpacity
                  style={styles.form}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Tabletech', {
                      data: item.attempt?Object.values(item.attempt):[],
                    })
                  }>
                  <Text
                    style={{paddingLeft: 10, fontWeight: 'bold', fontSize: 20}}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.NoAssign}>No assignment Uploaded</Text>
      )}
      <View style={{paddingLeft: 15, paddingTop: 20}}>
        <Button
          title="Add Assignment"
          onPress={() => navigation.navigate('Form')}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#E3E6E7',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 4,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
  },
  NoAssign: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
    textAlignVertical: 'center',
    padding: 40,
  },
});
export default assignment;
