import { findNextDate } from "../../utils/HelperFunctions";
import * as actions from "./houseTypes";

// add chore
export const addChores =
  (data) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.ADD_CHORE_START });
    try {
      const newChore = {
        name: data.chore,
        userId: userId,
        createdAt: new Date().toISOString(),
        frequency: data.frequency,
        amount: data.amount,
        color: data.color,
      };

      await firestore.collection("chores").add(newChore);

      dispatch({ type: actions.ADD_CHORE_SUCCESS });
      return true;
    } catch (err) {
      dispatch({ type: actions.ADD_CHORE_FAIL, payload: err.message });
    }
  };

//get chores
export const getChores =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.GET_CHORE_START });
    try {
      const choresList = await firestore
        .collection("chores")
        .where("userId", "==", userId);

      choresList.onSnapshot((snapshot) => {
        let chores = [];
        snapshot.docs.forEach((doc) => {
          chores.push({
            id: doc.id,
            name: doc.data().name,
            userId: doc.data().userId,
            createdAt: doc.data().createdAt,
            frequency: doc.data().frequency,
            amount: doc.data().amount,
            color: doc.data().color,
            lastDate: doc.data().lastDate,
            nextDate: doc.data().nextDate,
          });
        });
        dispatch({ type: actions.GET_CHORE_SUCCESS, payload: chores });
      });
    } catch (err) {
      dispatch({ type: actions.GET_CHORE_FAIL, payload: err });
      console.log(err);
    }
  };

//completeChore
export const completeChore =
  (id, data) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.GET_CHORE_START });
    try {
      const newLastDate = data.date.valueOf();
      const nextDate = findNextDate(data.frequency, data.amount, data.date);
      const newDate = new Date(nextDate).valueOf();

      await firestore.collection("chores").doc(id).update({
        lastDate: newLastDate,
        nextDate: newDate,
      });

      dispatch({ type: actions.COMPLETE_CHORE_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.GET_CHORE_FAIL, payload: err });
    }
  };

//add Workout
export const addWorkout =
  (data) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.ADD_WORKOUT_START });
    try {
      const newWorkout = {
        name: data.name,
        userId: userId,
        type: data.type,
        date: data.date.valueOf(),
      };

      await firestore.collection("workouts").add(newWorkout);

      dispatch({ type: actions.ADD_WORKOUT_START });
    } catch (err) {
      dispatch({ type: actions.ADD_WORKOUT_FAIL });
    }
  };

//get Workouts
export const getWorkouts =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.GET_WORKOUT_START });
    try {
      const workoutList = await firestore
        .collection("workouts")
        .where("userId", "==", userId);

      workoutList.onSnapshot((snapshot) => {
        let workouts = [];
        snapshot.docs.forEach((doc) => {
          workouts.push({
            id: doc.id,
            name: doc.data().name,
            userId: doc.data().userId,
            type: doc.data().type,
            date: doc.data().date,
          });
        });
        dispatch({ type: actions.GET_WORKOUT_SUCCESS, payload: workouts });
      });
    } catch (err) {
      dispatch({ type: actions.GET_WORKOUT_FAIL, payload: err });
      console.log(err);
    }
  };

//Delete Workout
export const deleteWorkout =
  (id) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    dispatch({ type: actions.DELETE_WORKOUT_START });
    try {
      await firestore.collection("workouts").doc(id).delete();
      dispatch({ type: actions.DELETE_WORKOUT_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.DELETE_WORKOUT_FAIL, payload: err });
      console.log(err);
    }
  };
