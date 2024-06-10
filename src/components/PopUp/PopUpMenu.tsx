import { useDispatch } from "react-redux";
import styles from "./popup.module.css";
import { exit } from "../../store/slices/dataSlice";
import { useNavigate } from "react-router-dom";

export default function PopUpMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.popup__container}>
      <span
        onClick={() => {
          dispatch(exit());
          navigate("/");
        }}
        className={styles.popup__container_element}
      >
        Выйти
      </span>
    </div>
  );
}
