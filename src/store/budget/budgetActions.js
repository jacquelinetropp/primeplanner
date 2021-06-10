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
      price: data.price,
      userId: userId,
      dueDate: data.date.valueOf(),
    };
    try {
      await firestore.collection("budget").add(budgetItem);
      dispatch({ type: actions.ADD_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.ADD_BUDGET_FAIL, payload: err });
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
            date: doc.data().date
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

    dispatch({ dispatch: actions.SET_BUDGET_START });
    const info = {
      userId: userId,
      amount: data.amount,
    };
    try {
      await firestore.collection("finance").add(info);
      dispatch({ type: actions.SET_BUDGET_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.SET_BUDGET_FAIL, payload: err });
    }
  };
// get Max budget
export const getMaxBudget =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.GET_BUDGET_START });

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
        dispatch({ type: actions.GET_BUDGET_SUCCESS, payload: budget });
      });
    } catch (err) {
      dispatch({ type: actions.GET_BUDGET_FAIL, payload: err });
    }
  };
