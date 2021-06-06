import * as actions from './houseTypes';

// add chore
export const addChores = (data) => async (
    dispatch,
    getState,
    { getFirestore }
  ) => {
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
  
      await firestore
        .collection("chores")
        .add(newChore)
   
      dispatch({ type: actions.ADD_CHORE_SUCCESS });
      return true;
    } catch (err) {
  
      dispatch({ type: actions.ADD_CHORE_FAIL, payload: err.message });
    }
  };

  //get chores
  export const getChores = () => async (
    dispatch,
    getState,
    { getFirestore }
  ) => {
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
            nextDate: doc.data().nextDate
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
export const completeChore = (id, data) => async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({type: actions.GET_CHORE_START});
  try {
    // const choreCall = await firestore.collection("chores").doc(id).get();
    // const chore = choreCall.data();

    const newLastDate = data.date.valueOf();
    
    await firestore.collection("chores").doc(id).update({
      lastDate: newLastDate
    })


    dispatch({type: actions.COMPLETE_CHORE_SUCCESS})
  }
  catch(err) {
    dispatch({type: actions.GET_CHORE_FAIL, payload: err})
  }

}
