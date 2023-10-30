import axios from "axios";

const initialValue = {
  todos: [],
  isLoading: false,
  error: "",
};

export default function todoReducer(state = initialValue, action) {
  switch (action.type) {
    case "START_FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS_GET_TODO":
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case "DELETE_TODO": {
      const filterTodo = state.todos.filter(
        (item) => item.id != action.payload
      );
      return {
        ...state,
        todos: filterTodo,
      };
    }
    case "UPDATE_TODO": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, value: action.payload.value }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    default:
      return state;
  }
}

function startFetching() {
  return {
    type: "START_FETCHING",
  };
}

function successGetTodo(data) {
  return {
    type: "SUCCESS_GET_TODO",
    payload: data,
  };
}

export function deleteTodo(id) {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
}
export function updateTodo(id, value) {
  return {
    type: "UPDATE_TODO",
    payload: { id, value },
  };
}
export function getTodo() {
  return async function (dispatch) {
    dispatch(startFetching());

    const { data } = await axios(
      `https://652d3ffcf9afa8ef4b271ed7.mockapi.io/todo`
    );

    dispatch(successGetTodo(data));
  };
}
export function addTodo(newTodo) {
  return async function (dispatch) {
    dispatch(startFetching());

    await axios.post(
      `https://652d3ffcf9afa8ef4b271ed7.mockapi.io/todo`,
      newTodo
    );
    dispatch(getTodo());
  };
}
export function deleteTodoApi(id) {
  return async function (dispatch) {
    dispatch(startFetching());

    await axios.delete(
      `https://652d3ffcf9afa8ef4b271ed7.mockapi.io/todo/${id}`
    );
    dispatch(getTodo());
  };
}

export function updateTodoApi(id, value) {
  return async function (dispatch) {
    dispatch(startFetching());
    await axios.put(`https://652d3ffcf9afa8ef4b271ed7.mockapi.io/todo/${id}`, {
      value,
    });
    dispatch(updateTodo(id, value));
    dispatch(getTodo());
  };
}
