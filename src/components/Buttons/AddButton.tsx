import { setCreateTodoOpen } from "../../store/slices/dataSlice";
import add from "../../../public/plus_trx55obojv0m.svg";
import { useDispatch } from "react-redux";

type AddButtonType = {
  date: Date;
};

export default function AddButton({ date }: AddButtonType) {
  const dispatch = useDispatch();

  return (
    <img
      onClick={() => {
        dispatch(setCreateTodoOpen(JSON.stringify(date)));
      }}
      style={{ width: "20px", height: "20px" }}
      src={add}
      alt="add"
    />
  );
}
