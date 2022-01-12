import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as db from './db';
import AsyncStorage from '@react-native-async-storage/async-storage';

const create_assignment = ({navigation}) => {
  const [title, setTitle] = useState();
  const [className, setClassName] = useState();
  const [ques, setQues] = useState('');
  const [correct, setCorrect] = useState('');
  const [Questions, setQuestion] = useState([]);
  const [textInput, setTextInput] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    getOnlineUser();
    navigation.setOptions({
      title:"Create Assignment",
      headerTintColor:"white",
      headerStyle:{
        backgroundColor:"rgba(0, 0, 0, 0.3)"
       
      }
    })
  }, []);

  const addTextInput = index => {
    let textInputCopy = textInput;
    textInputCopy.push(
      <TextInput
        style={styles.textInput2}
        onChangeText={text => addValues(text, index)}
        placeholder="Enter Option"
        placeholderTextColor="'rgba(255,255,255,0.6)"
      />,
    );
    setTextInput([...textInputCopy]);
  };
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
  const removeTextInput = () => {
    textInput.pop();
    inputData.pop();
    setTextInput([...textInput]);
    setInputData([...inputData]);
  };
  const addValues = (text, index) => {
    let dataArray = inputData;

    for (let i = 0; i < textInput.length; i++) {
      if (i == index) {
        dataArray[i] = text;
        setInputData([...dataArray]);
      }
    }
  };
  const includesValue = inputData.some(element => {
    return element.toLowerCase() === correct.toLowerCase();
  });
  const getValues = () => {
    if (textInput.length < 2) {
      Alert.alert('Alert!', 'Minimum 2 options is required', [
        {
          text: 'OK',
        },
      ]);
    } else {
      if (ques.length < 1) {
        showmsg('Please Enter Question');
      } else if (correct.length < 1) {
        showmsg('Please Enter Correct Option');
      } else if (includesValue == false) {
        Alert.alert('Alert!', 'Correct Option must be in Options', [
          {
            text: 'OK',
          },
        ]);
      } else if (
        inputData.length == textInput.length &&
        inputData.includes('')
      ) {
        Alert.alert('Alert!', 'Options must be filled', [
          {
            text: 'OK',
          },
        ]);
      } else {
        let temp = {question: ques, options: inputData, correct: correct};
        setQuestion(prevState => [...prevState, temp]);
        setInputData([]);
        setTextInput([]);
        setQues('');
        setCorrect('');
      }
    }
  };
  const showmsg = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  const uploadAssignment = async () => {
    const result = await db.default.createAssignment(
      email,
      name,
      title,
      Questions,
      className,
    );
    if (result == 'create') {
      navigation.navigate('Form1');
      setClassName();
      setCorrect();
      setTitle();
      setQues();
      setQuestion();
    } else {
      showmsg('something went wront, Please try again');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ScrollView
          style={{
            padding: 15,
          }}>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="format-title"
              color={'rgba(255,255,255,0.7)'}
              size={20}
            />
            <TextInput
              placeholder="Assignment Title"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={[styles.textInput]}
              value={title}
              autoCapitalize="none"
              keyboardType={
                Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
              }
              onChangeText={val => setTitle(val)}
            />
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="format-title"
              color={'rgba(255,255,255,0.7)'}
              size={20}
            />
            <TextInput
              placeholder="Class Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={[styles.textInput]}
              value={className}
              autoCapitalize="none"
              keyboardType={
                Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
              }
              onChangeText={val => setClassName(val)}
            />
          </View>

          <View style={styles.action}>
            <AntDesign
              name="questioncircleo"
              color={'rgba(255,255,255,0.7)'}
              size={20}
            />
            <TextInput
              placeholder="Enter Question"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={[styles.textInput]}
              autoCapitalize="none"
              value={ques}
              keyboardType={
                Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
              }
              onChangeText={val => setQues(val)}
            />
          </View>
          {textInput.map((value, index) => {
            return (
              <View key={index} style={[styles.textInput]}>
                {value}
              </View>
            );
          })}
          <View style={styles.row}>
            <View>
              <TouchableOpacity
                style={{margin: 20}}
                disabled={textInput.length > 3 ? true : false}
                onPress={() => addTextInput(textInput.length)}>
                <LinearGradient
                  colors={['#4d2e33', '#d7a083']}
                  style={styles.btnStyle}>
                  <Text style={[styles.btnText]}> Add Option </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{margin: 20}}
                disabled={textInput.length > 0 ? false : true}
                onPress={() => removeTextInput()}>
                <LinearGradient
                  colors={['#4d2e33', '#d7a083']}
                  style={styles.btnStyle}>
                  <Text style={[styles.btnText]}>Remove Option</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="comment-question"
              color={'rgba(255,255,255,0.7)'}
              size={20}
            />
            <TextInput
              placeholder=" Enter Correct Answer"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={correct}
              style={[styles.textInput]}
              autoCapitalize="none"
              keyboardType={
                Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
              }
              onChangeText={val => setCorrect(val)}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => getValues()}>
              <LinearGradient
                colors={['#4d2e33', '#d7a083']}
                style={styles.btnStyle}>
                <Text style={[styles.btnText]}>Add Question</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => uploadAssignment()}>
              <LinearGradient
                colors={['#4d2e33', '#d7a083']}
                style={styles.btnStyle}>
                <Text style={[styles.btnText]}>Upload Assignment</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default create_assignment;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    paddingBottom: 10,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  textInput2: {
    height: 40,
    borderColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    margin: 15,
    color: '#fff',
    padding: 10,
  },
  btnStyle: {
    flexDirection: 'row',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    padding: 5,
    color: 'rgba(255,255,255,0.7)',
  },
  displayTime: {
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
    fontWeight: 'bold',

    fontSize: 20,
  },
});
