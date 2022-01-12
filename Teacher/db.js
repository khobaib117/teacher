import * as firebase from 'firebase';
import Firebase from '../config/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = Firebase.auth();

//storing teacher data after sign up
async function storeTeacherData(name, mail, uid) {
  firebase.database().ref(`db/teachers/${uid}`).update({
    name: name,
    mail: mail,
  });
  return 'stored';
}

async function getTeacherData(uid) {
  let teachers = [];
  await firebase
    .database()
    .ref(`db/teachers/${uid}`)
    .on('value', snapshot => {
      const temp = snapshot.val();
      if (temp) {
        teachers = Object.values(temp); //returns an array
        const Email = JSON.stringify(teachers[0]);
        AsyncStorage.setItem('email', Email);
        const Name = JSON.stringify(teachers[1]);
        AsyncStorage.setItem('name', Name);
        return Object.values(temp);
      }
    });

  return teachers;
}

function getAssignments(mail) {
  let assignments = [];
  firebase
    .database()
    .ref(`db/assignments`)
    .on('value', snapshot => {
      const temp = snapshot.val();
      if (temp) {
        Object.values(temp).forEach(assign => {
          if (assign.creatorMail === mail) {
            assignments.push(assign);
          }
        }); //returns an array of assignments for specific teacher
      }
    });

  return assignments;
}

async function createAssignment(mail, name, title, questionsObj, className) {
  let timestamp = firebase.database().ref('db/assignments').push().key;

  firebase.database().ref(`db/assignments/${timestamp}`).update({
    creatorMail: mail,
    creatorName: name,
    title: title,
    questions: questionsObj,
    className: className,
    id: timestamp,
  });
  return 'create';
}
export default {
  storeTeacherData,
  getTeacherData,
  getAssignments,
  createAssignment,
};
