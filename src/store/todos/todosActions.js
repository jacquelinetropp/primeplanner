import * as actions from "./todosTypes";

//getTodos
export const getTodos = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
    dispatch({ type: actions.GET_TODO_START });
    const todos = await firestore.collection("todos").where("key", "==", id).orderBy("dueDate");

    todos.onSnapshot((snapshot) => {
      let todos = [];
      snapshot.docs.forEach((doc) => {
        todos.push({
          id: doc.id,
          todo: doc.data().todo,
          key: doc.data().key,
          dueDate: doc.data().dueDate,
          priority: doc.data().priority,
          createdAt: doc.data().createdAt,
          completed: doc.data().completed,
        });
      });

      dispatch({ type: actions.GET_TODO_SUCCESS, payload: todos });
    });
  } catch (err) {
    dispatch({ type: actions.GET_TODO_FAIL, payload: err });
  }
};

//add todo
export const addTodo = (data, id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actions.ADD_TODO_START });
  try {
    const newTodo = {
      todo: data.todo,
      key: id,
      userId: userId,
      createdAt: new Date().valueOf(),
      dueDate: data.date.valueOf(),
      completed: false,
      priority: data.priority,
    };

    let todo;
    await firestore
      .collection("todos")
      .add(newTodo)
      .then((docRef) => {
        todo = {
          ...newTodo,
          id: docRef.id,
        };
      });

    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};

//delete todo
export const deleteTodo = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: actions.DELETE_TODO_START });
  try {
    firestore.collection("todos").doc(id).delete();
    dispatch({ type: actions.DELETE_TODO_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
  }
};

//edit todo
export const editTodo = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: actions.ADD_TODO_START });
  try {
    const update = data.todo;
    const updatedPriority = data.priority;
    const updatedDate = data.date.valueOf()

    await firestore.collection("todos").doc(id).update({
      todo: update,
      priority: updatedPriority,
      dueDate: updatedDate
    });
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};

export const completeTodo = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: actions.COMPLETE_TODO_START });
  try {

    const todoCall = await firestore.collection("todos").doc(id).get();
    const todo = todoCall.data();

    // eslint-disable-next-line eqeqeq
    if (todo.completed == true) {
      await firestore.collection("todos").doc(id).update({
        completed: false,
      });
    } else {
      await firestore.collection("todos").doc(id).update({
        completed: true,
      });
    }


    dispatch({ type: actions.COMPLETE_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.COMPLETE_TODO_FAIL, payload: err.message });
  }
};

//get all users todos
export const getAllTodos = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  try {
    dispatch({ type: actions.GET_TODO_START });
    const todos = await firestore.collection("todos").where("userId", "==", userId).orderBy("dueDate");

    todos.onSnapshot((snapshot) => {
      let todos = [];
      snapshot.docs.forEach((doc) => {
        todos.push({
          id: doc.id,
          todo: doc.data().todo,
          key: doc.data().key,
          dueDate: doc.data().dueDate,
          priority: doc.data().priority,
          createdAt: doc.data().createdAt,
          completed: doc.data().completed,
        });
      });

      dispatch({ type: actions.GET_ALL_TODO_SUCCESS, payload: todos });
    });
  } catch (err) {
    dispatch({ type: actions.GET_TODO_FAIL, payload: err });
  }
};