import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addTodo } from "../redux/reducers/todoReducer";


export default function Todo() {
  const [inputan, setInputan] = useState("");
  const dispatch = useDispatch();
  function handleSubmit (event) {
    event.preventDefault();

    let newTodo = {
      value : inputan,
      status : false
    }
    dispatch(addTodo(newTodo))
    setInputan("");
  }
  return (
    <div className="container mx-auto mt-14 text-center">
    <h2 className="text-3xl  font-bold">
  What&apos;s the plan for today?
    </h2>
    
      <div className="mt-5">
      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "inactive-link"}>
      ALL
      </NavLink>
      <NavLink to="/aktif" className={({ isActive }) => isActive ? "active-link" : "inactive-link"}>
      ACTIVE
      </NavLink>
      <NavLink to="/selesai"className={({ isActive }) => isActive ? "active-link" : "inactive-link"}>
      COMPELETED
      </NavLink>
      </div>
      <div className="mt-10">
      <form>
      <input type="text" placeholder="What to do" className="input input-bordered w-full max-w-xs" value={inputan} onChange={(e) => setInputan(e.target.value)} />
      <button className="btn btn-primary ml-5" onClick={handleSubmit}>Add</button>
      </form>
    </div>
</div>
  )
}
