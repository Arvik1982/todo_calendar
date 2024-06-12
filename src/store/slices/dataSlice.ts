import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentMonth = new Date().getMonth() + 1;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();


const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: {
      weekNumber: 0,
      selectedMonth: currentMonth,
      selectedYear: currentYear,
      event: "",
    },
    daysOffYear: "",
    newUser: "",
    users: [],
    currentUser: "",
    createTodoOpen: false,
    weekendsError:'',
  },

  reducers: {
    setDataWeekNumber(state, action) {
      state.data.weekNumber = action.payload;
    },
    setDataSelectedMonth(state, action) {
      state.data.selectedMonth = action.payload;
    },
    setDataSelectedYear(state, action) {
      state.data.selectedYear = action.payload;
    },
    daysOffYear(state, action) {
      state.daysOffYear = JSON.parse(action.payload);
      localStorage.setItem("yearHolydays", action.payload);
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
      state.currentUser = action.payload;
    },

    login(state) {
      const localUsers = JSON.parse(localStorage.getItem("users") || "");
      localUsers.includes(state.newUser) ? "" : localUsers.push(state.newUser);
      localStorage.setItem("users", JSON.stringify(localUsers));
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    setCreateTodoOpen(state, action?) {
      state.createTodoOpen = !state.createTodoOpen;
      state.data.event = action?.payload;
    },

    exit(state) {
      state.currentUser = "";
      localStorage.removeItem("currentUser");
    },
    setCreateTodoClose(state) {
      state.createTodoOpen = false;
    },
    setWeekendsError(state, action:PayloadAction<string>) {
      state.weekendsError = action.payload;
    },
  },
});

export const {
  setDataWeekNumber,
  setDataSelectedMonth,
  setDataSelectedYear,
  daysOffYear,
  setNewUser,
  login,
  exit,
  setCreateTodoOpen,
  setCreateTodoClose,
  setWeekendsError
} = dataSlice.actions;
export default dataSlice.reducer;
