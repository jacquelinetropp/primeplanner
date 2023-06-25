import { batch } from "react-redux";
import * as actions from "./budgetTypes";

//Add budget item
export const addBudgetItem =
  (data) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.ADD_BUDGET_START });
    const budgetItem = {
      name: data.name,
      price: data.amount,
      userId: userId,
      date: data.date.valueOf(),
    };
    try {
      await firestore.collection("budget").add(budgetItem);
      dispatch({ type: actions.ADD_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.ADD_BUDGET_FAIL, payload: err });
      console.log(err);
    }
  };

//Edit budget item
export const editBudgetItem =
  (data, id) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.ADD_BUDGET_START });
    const budgetItem = {
      name: data.name,
      price: data.amount,
      userId: userId,
      date: data.date.valueOf(),
    };
    try {
      await firestore.collection("budget").doc(id).update(budgetItem);
      dispatch({ type: actions.ADD_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.ADD_BUDGET_FAIL, payload: err });
      console.log(err);
    }
  };

//Delete budget item
export const deleteBudgetItem =
  (id) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    dispatch({ type: actions.DELETE_BUDGET_START });
    try {
      await firestore.collection("budget").doc(id).delete();
      dispatch({ type: actions.DELETE_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.DELETE_BUDGET_FAIL, payload: err });
      console.log(err);
    }
  };

//Get budget Items
export const getBudget =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.GET_BUDGET_START });

    try {
      const budgetList = await firestore
        .collection("budget")
        .where("userId", "==", userId);
      budgetList.onSnapshot((snapshot) => {
        let budget = [];
        snapshot.docs.forEach((doc) => {
          budget.push({
            id: doc.id,
            name: doc.data().name,
            userId: doc.data().userId,
            price: doc.data().price,
            date: doc.data().date,
          });
        });
        dispatch({ type: actions.GET_BUDGET_SUCCESS, payload: budget });
      });
    } catch (err) {
      dispatch({ type: actions.GET_BUDGET_FAIL, payload: err.message });
    }
  };

export const setBudget =
  (data) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.SET_BUDGET_START });
    const info = {
      userId: userId,
      amount: data.amount,
    };

    try {
      firestore.collection("finance").add(info);

      dispatch({ type: actions.SET_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.SET_BUDGET_FAIL, payload: err.message });
    }
  };

export const editBudget =
  (data) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const docId = getState().finance.max[0].id;

    dispatch({ type: actions.SET_BUDGET_START });
    try {
      await firestore.collection("finance").doc(docId).update({
        amount: data.amount,
      });

      dispatch({ type: actions.SET_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.SET_BUDGET_FAIL, payload: err.message });
    }
  };
// get Max budget
export const getMaxBudget =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.GET_MAX_START });

    try {
      const budgetList = await firestore
        .collection("finance")
        .where("userId", "==", userId);

      budgetList.onSnapshot((snapshot) => {
        let budget = [];
        snapshot.docs.forEach((doc) => {
          budget.push({
            id: doc.id,
            amount: doc.data().amount,
          });
        });
        dispatch({ type: actions.GET_MAX_SUCCESS, payload: budget });
      });
    } catch (err) {
      dispatch({ type: actions.GET_MAX_FAIL, payload: err });
    }
  };

//Delete All Budget Items

export const resetBudget =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.RESET_BUDGET_START });
    try {
      firestore
        .collection("budget")
        .where("userId", "==", userId)
        .get()
        .then((querySnapshot) => {
          let batch = firestore.batch();
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          return batch.commit();
        });
      dispatch({ type: actions.RESET_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.RESET_BUDGET_FAIL, payload: err });
    }
  };
