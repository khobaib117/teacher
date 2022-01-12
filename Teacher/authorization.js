import Firebase from '../config/firebase'; // firebase config that you got from firebase console.
import db from './db';

const auth = Firebase.auth();

const onSignUp = async (name, mail, password) => {
  try {
    let user_detail;
    await auth.createUserWithEmailAndPassword(mail, password).then(() => {
      user_detail = db.storeTeacherData(
        name,
        mail.toLowerCase(),
        auth.currentUser.uid,
      );
    });

    return user_detail;
  } catch (error) {
    console.log(error.message);
  }
};

const onLogin = async (mail, password) => {
  try {
    await auth.signInWithEmailAndPassword(mail, password);

    let user_detail = await db.getTeacherData(auth.currentUser.uid);

    //check if user mail is verified
    return user_detail;
  } catch (error) {
    console.log(error);
  }
};
export default {
  onSignUp,
  onLogin,
};
