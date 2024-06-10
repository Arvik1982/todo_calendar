import styles from "./todo.module.css";
import add from "../../../public/plus_trx55obojv0m.svg";
import deleteImg from "../../../public/delete_aywxaa67lncc.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTodoOpen } from "../../store/slices/dataSlice";
import { IRootStoreType } from "../../types/types";
import { useState } from "react";

type TodoPropsType = {
  date: Date;
};
type TodosElementType = {
  date: Date;
  user: string;
  text: {
    id: number;
    text: string;
  };
};

export default function Todo({ date }: TodoPropsType) {
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(0);
  const currentUser = useSelector(
    (state: IRootStoreType) => state.calendarReducer.currentUser
  );

  const todos =
    localStorage.getItem("events") !== null
      ? JSON.parse(localStorage.getItem("events") || "")
      : "";
  const user = currentUser
    ? currentUser
    : localStorage.getItem("currentUser") !== null
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : "";

  const filteredEvent = (newDate: Date) => {
    if (todos) {
      const result: Array<{}> = [];
      todos.forEach((element: TodosElementType) => {
        if (element.user === user) {
          new Date(element.date).getTime() === newDate.getTime()
            ? result.push(element.text)
            : "";
        }
      });

      return result;
    }
  };

  const deleteEvent = (id) => {
    let result;
    result = todos.filter((el) => {
      return el.text.id !== id;
    });
    localStorage.setItem("events", JSON.stringify(result));
    setRerender(rerender + 1);
  };

  const checkEvent = (id) => {
   
     todos.forEach((el) => {
      
     if(el.text.id === id) {
      el.text.checked===true?
    el.text.checked=false:el.text.checked=true}
      
     
    });
    localStorage.setItem("events", JSON.stringify(todos));
    setRerender(rerender + 1);

    console.log(todos)
  };




  return (
    <div className={styles.todo__container}>
      {/* <img
        onClick={() => {
          dispatch(setCreateTodoOpen(JSON.stringify(date)));
        }}
        style={{ width: "20px", height: "20px" }}
        src={add}
        alt="add"
      /> */}

      {filteredEvent(date)
        ? filteredEvent(date)?.map((el, index) => {
        
            return (
              <div key={index} className={styles.container__todo}>
                <input checked={el.checked}  onChange={()=>{checkEvent(el.id)}}type="checkbox" />
                <span style={el.checked?{textDecoration:'line-through'}:{}} key={rerender}>{el.text}</span>
                <img
                  onClick={() => {
                    deleteEvent(el.id);
                  }}
                  style={{ width: "20px", height: "20px" }}
                  src={deleteImg}
                  alt="delete"
                />
              </div>
            );
          })
        : ""}
    </div>
  );
}
