import * as actions from "./userTypes";

export const signUp = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: actions.AUTH_START });
  try {
    const API = "AIzaSyAX8WWASOSjkyKMoVCIlzZkK0Vh-4WHljI";
    const coordinates = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.location}&key=${API}`)
      .then((res) => res.json())
      .then((data) => data);
    const lat = coordinates.results[0].geometry.location.lat;
    const lng = coordinates.results[0].geometry.location.lng;

    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);

    //send verification email
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();

    await firestore.collection("users").doc(res.user.uid).set({
      firstName: data.firstName,
      lastName: data.lastName,
      lat,
      lng
    });
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
    console.log(err);
  }
  dispatch({ type: actions.AUTH_END });
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {}
};

export const signIn = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actions.AUTH_START });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

//Verify Email actions
export const verifyEmail = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: actions.VERIFY_START });
  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: actions.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.VERIFY_FAIL, payload: err.message });
  }
};

//Recover Password
export const recoverPassword = (data) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: actions.RECOVERY_START });
  try {
    // send email ehre
    await firebase.auth().sendPasswordResetEmail(data.email);
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: err.message });
  }
};

//edit profile
export const editProfile = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  dispatch({ type: actions.PROFILE_START });

  const API = "ObfysELOcnDcQmgVmGvAGGS4ohPJlfFF";
    const coordinates = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/address?key=${API}&location=${data.location}`
    )
      .then((res) => res.json())
      .then((data) => data);

    const lat = coordinates.results[0].locations[0].latLng.lat;
    const lng = coordinates.results[0].locations[0].latLng.lng;

  
  try {
    if (data.email !== userEmail) {
      await user.updateEmail(data.email);
    }
    await firestore.collection("users").doc(userId).set({
      firstName: data.firstName,
      lastName: data.lastName,
      lat: lat,
      lng: lng
    });

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }
    dispatch({ type: actions.PROFILE_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.PROFILE_FAIL, payload: err.message });
  }
};

//Delete user
export const deleteUser = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_START });
  try {
    await user.delete();

    await firestore.collection("users").doc(userId).delete();
  } catch (err) {
    dispatch({ type: actions.DELETE_FAIL, payload: err.message });
  }
};

export const clean = () => ({
  type: actions.CLEAN_UP,
});

//toggle profile
export const toggleProfile = () => ({
  type: actions.TOGGLE_PROFILE,
});
