import { useDispatch, useSelector } from "react-redux";
import "../style/isActive.css"
import Todo from "./Todo";
import { deleteTodoApi, getTodo, updateStatusTodoApi, updateTodoApi } from "../redux/reducers/todoReducer";
import { useEffect, useState } from "react";

export default function Selesai() {
  const dispatch = useDispatch();
  const {isLoading, todos} = useSelector((state) => state.todo);
  const [editingId, setEditingId] = useState(""); // Tambah state baru untuk menyimpan ID To-Do yang sedang diedit
  const [editedValue, setEditedValue] = useState(""); // Tambah state untuk nilai To-Do yang sedang diedit
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  function handleDelete (id) {

    dispatch(deleteTodoApi(id));
  }
  function handleEdit(id, value) {
    setEditingId(id); // Atur ID To-Do yang sedang diedit
    setEditedValue(value); // Atur nilai To-Do yang sedang diedit
  }

  function handleUpdate(id) {
    dispatch(updateTodoApi(id, editedValue)); // Dispatch aksi untuk mengupdate nilai To-Do
    setEditingId(""); // Atur kembali state editingId menjadi null setelah update
  }

  function handleCompleted(id, status) {
    const updatedStatus = !status; // Invert the status when checkbox is clicked
    dispatch(updateStatusTodoApi(id, updatedStatus));
  }

  const activeTodos = todos.filter(todo => todo.status === true);
  return (
    <>
    <Todo/>
    {
      isLoading ? (<div className="text-center">Loading...</div> ):
      todos.length > 0 ?
      (
        activeTodos.map((todo) => (
          <div key={todo.id} className="lg:w-1/3 md:w-1/2 border border-slate-700 border-solid mx-auto mt-5 justify-between flex py-3">
            <div className="mx-2">
              {editingId === todo.id ? ( // Jika sedang mengedit, tampilkan input
                <input value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
              ) : (
                <>
                <input className="mx-3" type="checkbox" checked={todo.status} onChange={() => handleCompleted(todo.id, todo.status)} />
            <span className={todo.status ? "line-through" : ""}>{todo.value}</span>
                </>
              )}
            </div>
            <div className="mx-2">
              {editingId === todo.id ? ( // Jika sedang mengedit, tampilkan tombol "Update"
                <button className="mx-3" onClick={() => handleUpdate(todo.id)}>Update</button>
              ) : (
                <button className="mx-3" onClick={() => handleEdit(todo.id, todo.value)}>✏️</button>
              )}
              <button onClick={() => handleDelete(todo.id)}>❌</button>
            </div>
          </div>
        ))
      ) :
      (<div>data empty</div>)

     }
    </>
  )
}
