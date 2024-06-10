import { useDispatch, useSelector } from "react-redux";
import { IRootStoreType } from "../../types/types";
import styles from "./createTodo.module.css";
import { useState } from "react";
import { setCreateTodoClose, setCreateTodoOpen } from "../../store/slices/dataSlice";
import { dateToString } from "../../helpers/data/lib";

export default function CreateTodo() {

    const [textValue, setTextValue]=useState('')
    const dispatch=useDispatch()
    const closeModal =()=>{
            dispatch(setCreateTodoClose())
       }

    const currentUser = useSelector(
        (state: IRootStoreType) => state.calendarReducer.currentUser
      );
      const eventDateRedux = useSelector(
        (state: IRootStoreType) => state.calendarReducer.data.event
      );
      const user = currentUser?currentUser:(localStorage.getItem('currentUser')!==null?JSON.parse(localStorage.getItem('currentUser')||''):'')
      const eventDate = JSON.parse(eventDateRedux)

      const addEvent =()=>{
    localStorage.getItem('events')!==null?'':localStorage.setItem('events',JSON.stringify([]))
      const eventsArr =JSON.parse(  localStorage.getItem('events')||'' )
      const event = {
        user:user,
        date:eventDate, 
        text:textValue
        } 
        event.text?eventsArr.push(event):''
  
      localStorage.setItem('events',JSON.stringify(eventsArr))
    dispatch(setCreateTodoClose()) 
      }

  return (
    <div onClick={closeModal}  className={styles.container}>
      <div onClick={(e)=>{e.stopPropagation()}}   className={styles.container__content}>
        <span>{user}</span>
        <span>{dateToString(eventDate)}</span>
        <textarea value ={textValue} onChange={(e)=>{setTextValue(e.target.value)}}className={styles.container__content_text}  name="" id=""/>

        <div className={styles.container__content_buttons}>
          <button onClick={()=>{dispatch(setCreateTodoOpen(JSON.stringify(eventDate)))}} className={styles.content__buttons_button}>Отмена</button>
          <button onClick={addEvent} className={styles.content__buttons_button}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}
